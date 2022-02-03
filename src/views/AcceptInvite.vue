<template>
  <div id="accept-invite-page">
    <div class='header'><img src="/logo_orange.png" id="logoStandAlone" /></div>
    <FormulateForm @submit="acceptInvite" v-model="form" id="accept-invite-form">
      <h2>Accept Invite</h2>
      <FormulateInput type="password" label="Password" name="password"
        error-behavior="live"
        validation="^required|min:8,length|matches:/[0-9]/"
        :validation-messages="{
          matches: 'Passwords require at least one number.'
        }"/>
      <FormulateInput type="password" label="Repeat Password" name="password_confirm" 
          validation="required|confirm"
          error-behavior="live"
          validation-name="Password confirmation"/>
      <div v-if="error" class="box-error">{{ error }}</div>
      <FormulateInput type="submit" :disabled="loading > 0">
        Accept Invite
        <InputLoader v-if="loading > 0" />
      </FormulateInput>
    </FormulateForm>
  </div>
</template>

<script>
import { acceptInvite as ACCEPT_INVITE } from "@/queries/acceptInvite.gql";

export default {
  props: {
    email: {
      type: String,
    },
    token: {
      type: String,
    },
  },
  data() {
    return {
      form: {
        password: null
      },
      error: null,
      loading: 0,
    };
  },
  methods: {
    acceptInvite() {
      this.loading++;
      this.error = "";
      const password = this.form.password;
      console.log("email",this.email)
      console.log("token",this.token)
      this.$apollo
        .mutate({
          mutation: ACCEPT_INVITE,
          variables: {
            email: this.email,
            token: this.token,
            password
          },
        })
        .then(({ data }) => {
          this.loading--;
          const user = data.activateUser.user;
          const token = data.activateUser.token;
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
          this.error = "Could not accept invite";
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
.page-accept-invite {
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

#accept-invite-form {
  max-width: 500px;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
  border-radius: @hh;
  padding: 0.3em @h2 @h4 @h2;
  margin: 0 auto;
  background-color: @colWhite;

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
