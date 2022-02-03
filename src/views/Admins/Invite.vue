<template>
  <div>
    <div class="page-actions">
      <h2>Invite admin</h2>
      <div></div>
    </div>
    <FormulateForm @submit="submit" v-model="form">
      <FormulateInput label="First Name" name="firstName" 
        validation="required"
        error-behavior="live"
        validation-name="First Name"
      />
      <FormulateInput label="Last Name" name="lastName" 
        validation="required"
        validation-name="Last Name"
        error-behavior="live"
      />
      <FormulateInput label="Twitter Handle" name="twitterHandle" 
      />
      <FormulateInput label="E-mail Address"      
        type="email"
        name="email"
        validation="required|email"
        error-behavior="live"
      />
      <FormulateInput
        name="roleIds"
        label="Role"
        type="select"
        placeholder="Select a role"
        :options="{'TfdAmPOAK4OLuQ73Nlo3':'Editor','6tMiEdemlWcRUA7oImbl':'Admin'}"
        validation="required"
        validation-name="Role"
        error-behavior="live"
      />
      <FormulateInput type="submit" label="Create" />
    </FormulateForm>
  </div>
</template>

<script>
import GET_ADMINS from "@/queries/getAdmins.gql";
import INVITE_ADMIN from "@/queries/inviteAdmin.gql";

export default {
  data() {
    return {
      form: {
        firstName: null,
        lastName: null,
        twitterHandle: null,
        email: null,
        roleIds: null
      },
    };
  },
  methods: {
    submit() {
      const firstName = this.form.firstName;
      const lastName = this.form.lastName;
      const twitterHandle = this.form.twitterHandle;
      const email = this.form.email;
      const roleIds = this.form.roleIds;
      this.$apollo.mutate({
        mutation: INVITE_ADMIN,
        variables: {
          firstName,
          lastName,
          email,
          roleIds
        },
        refetchQueries: [{ query: GET_ADMINS }],
      }).then((data) => {
        this.$router.push({ path: "/admins/" });
        console.log(data)        
          /*
          this.$store.dispatch("addToast", {
            type: "good",
            message: "Article created!",
          });
          */
      }).catch((error) => {
        if (error.toString().search('Not authenticated')) this.$store.dispatch("signOut");
      });
    },
  },
};
</script>

<style></style>
