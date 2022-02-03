<template>
  <div>
    <div class="page-actions">
      <h2>Change password</h2>
      <div></div>
    </div>
    <div class="sheet">
      <div v-if="admin && passwordChanged">
        <h3>{{admin.firstName}} {{admin.lastName}}</h3>
        Password changed
      </div>
      <div v-if="admin && !passwordChanged">
      <h3>{{admin.firstName}} {{admin.lastName}}</h3>
          <FormulateForm @submit="changePassword" v-model="form" id="change-password-form">
            <FormulateInput type="password" label="Old password" name="oldPassword"
              error-behavior="live"
              validation-name="Old password"
              validation="^required|min:8,length|matches:/[0-9]/"
              :validation-messages="{
                matches: 'Passwords require at least one number.'
              }"/>
            <FormulateInput type="password" label="New password" name="newPassword"
              error-behavior="live"
              validation="^required|min:8,length|matches:/[0-9]/"
              validation-name="New password"
              :validation-messages="{
                matches: 'Passwords require at least one number.'
              }"/>
            <FormulateInput type="password" label="Repeat new password" name="newPassword_confirm" 
              error-behavior="live"
                validation="required|confirm"
                validation-name="New password confirmation"/>
            <div v-if="error" class="box-error">{{ error }}</div>
            <FormulateInput type="submit" :disabled="loading > 0">
              Change password
              <InputLoader v-if="loading > 0" />
            </FormulateInput>
          </FormulateForm>
      </div>
    </div>
  </div>
</template>

<script>
import GET_ADMIN from "@/queries/getAdmin.gql";
import CHANGE_PASSWORD from "@/queries/changePassword.gql";

export default {
  data() {
    return {
      form: {
        oldPassword: null,
        newPassword: null
      },
      passwordChanged: false,
      error: null,
      loading: 0,
    };
  },
  methods: {    
    changePassword() {
      this.loading++;
      this.error = "";
      const newPassword = this.form.newPassword;
      const oldPassword = this.form.oldPassword;
      console.log(this.form)
      this.$apollo.mutate({
        mutation: CHANGE_PASSWORD,
        variables: {
          newPassword,
          oldPassword
        },
      }).then(({ data }) => {
          this.loading--;
          console.log(data)
          const user = data.changeUserPassword.user;
          const token = data.changeUserPassword.token;
          // console.log({token});

          if (user && token) {
            const auth = this.$store.dispatch("auth", {
              user,
              token,
            });
            if (auth) {
              this.form.newPassword = ""
              this.form.oldPassword = ""
              this.form.oldPassword_confirm = ""
              this.passwordChanged = true
            }
          } else {
            this.error = "Could not change password";
          }
        })
        .catch((error) => {
          this.loading--;

          this.error = error;
          console.error(error);
        });
    },
  },
  apollo: {
    admin: {
      query: GET_ADMIN,
      update(data) {
        console.log(data)
        return data.getAdmin.admin;
      },
    },
  },
};
</script>

<style></style>
