<template>
  <div id="forgetpassword-page">
    <div class='header'><img src="/logo_orange.png" id="logoStandAlone" /></div>
    <FormulateForm @submit="forgotPassword" v-model="form" id="forgot-password-form">
      <h2>Forgot password</h2>
      <div v-if="mailSent">Email sent with instructions on how to reset your password</div>
      <div v-if="!mailSent">
        <FormulateInput type="email" label="E-mail" name="email" validation="required|email" />
        <FormulateInput type="submit" :disabled="loading > 0">
          Submit
          <InputLoader v-if="loading > 0" />
        </FormulateInput>
      </div>
    </FormulateForm>
  </div>
</template>

<script>
import { forgotPassword as FORGOT_PASSWORD } from "@/queries/forgotPassword.gql";

export default {
  data() {
    return {
      form: {
        email: null
      },
      error: null,
      loading: 0,
      mailSent: false
    };
  },
  methods: {
    forgotPassword() {
      this.loading++;
      this.error = "";
      const email = this.form.email;
      this.$apollo
        .mutate({
          mutation: FORGOT_PASSWORD,
          variables: {
            email
          },
        })
        .then(({ data }) => {
          this.loading--;
          if (data.forgotUserPassword.success) {
            this.form.email = ""
            this.mailSent = true
          } else {
            this.error = "Operation failed";
          }
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
.page-forgot-password {
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


#forgot-password-form {
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
