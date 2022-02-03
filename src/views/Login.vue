<template>
  <div id="login-page">
    <div class='header'><img src="/logo_orange.png" id="logoStandAlone" /></div>
    <FormulateForm @submit="login" v-model="form" id="login-form">
      <h2>Log in</h2>
      <FormulateInput type="email" label="E-mail" name="email" validation="required|email" />
      <FormulateInput type="password" label="Password" name="password" validation="required" />
      <div v-if="error" class="box-error">{{ error }}</div>
      <FormulateInput type="submit" :disabled="loading > 0">
        Login
        <InputLoader v-if="loading > 0" />
      </FormulateInput>
      <router-link to="/forgotPassword">Forgot Password</router-link>
    </FormulateForm>
  </div>
</template>

<script>
import { loginUser as LOGIN_USER } from "@/queries/loginUser.gql";

export default {
  data() {
    return {
      form: {
        email: "",
        password: "",
      },
      error: null,
      loading: 0,
    };
  },
  methods: {
    login() {
      this.loading++;
      this.error = "";
      const email = this.form.email;
      const password = this.form.password;

      this.$apollo
        .mutate({
          mutation: LOGIN_USER,
          variables: {
            email,
            password,
          },
        })
        .then(({ data }) => {
          this.loading--;
          const user = data.loginUser.user;
          const token = data.loginUser.token;
          // console.log({token});

          if (user && token) {
            const auth = this.$store.dispatch("auth", {
              user,
              token,
            });
            if (auth)
              return this.$router.push({
                path: "/",
              });
          }
          this.error = "Could not login";
        })
        .catch((error) => {
          this.loading--;

          this.error = error;
          console.error(error);
        });
    },
  },
};
</script>

<style lang="less">
@import "../styles/vars";

body,
.page-login {
  background-color: @colBlack;
}

#logoStandAlone {
  width: 150px;
}

.header {
  height: 6em;
  text-align: center;
}

#logo {
  flex: 0 0;
  width: 150px;
  margin: 0.5em auto 1em auto;
}

#login-form {
  max-width: 500px;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
  border-radius: @hh;
  padding: 0.3em @h2 @h4 @h2;
  margin: 0 auto;
  background-color: @colWhite;

  a {
    float: right
  }

  button {
    background-color: @colOrange;
    border-color: @colOrange;
    color: @colBlack;
  }

  .box-error {
    width: 100%;
  }

  &::v-deep .formulate-input .formulate-input-element {
    max-width: none;
  }
}
</style>

<style lang="less">
body {
  padding-left: 0;
}

</style>
