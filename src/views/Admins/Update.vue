<template>
  <div>
    <div class="page-actions">
      <h2>Update admin</h2>
      <div></div>
    </div>
    <div class="sheet">
      <div v-if="admin">
      <h3>{{admin.firstName}} {{admin.lastName}}</h3>
      <FormulateInput v-model="admin.twitterHandle" type="text" label="TwitterHandle" name="twitterHandle"/>
        <FormulateInput 
          v-model="admin.roleIds[0]" 
          v-if="admin.roleIds != '2zg3BSH5gT5XZXXErzH4'"
          name="roleIds"
          label="Role"
          type="select"
          placeholder="Select a role"
          :options="{'TfdAmPOAK4OLuQ73Nlo3':'Editor','6tMiEdemlWcRUA7oImbl':'Admin'}"
        />
        <button @click="saveAdmin" class="main">Save</button>
        <button @click="deleteAdmin" class="delete">Delete</button>
      </div>
    </div>
  </div>
</template>

<script>
import GET_ADMINS from "@/queries/getAdmins.gql";
import GET_ADMIN from "@/queries/getAdmin.gql";
import DELETE_ADMIN from "@/queries/deleteAdmin.gql";
import UPDATE_ADMIN from "@/queries/updateAdmin.gql";

export default {
  props: {
    id: {
      type: String,
    },
  },
  methods: {
    saveAdmin() {
      const adminData = { ...this.admin };
      console.log("this.admin",this.admin)
      this.$apollo.mutate({
        mutation: UPDATE_ADMIN,
        variables: {
          ...this.admin,
        },
        error (error) {
          if (error.toString().search('Not authenticated')) this.$store.dispatch("signOut");
        },
        refetchQueries: [{ query: GET_ADMINS }],
      });
    },
    deleteAdmin() {
      if (!confirm("Delete this admin?")) return;
      this.$apollo.mutate({
        mutation: DELETE_ADMIN,
        variables: {
          id: this.id,
        },
        update: (data) => {
          console.log(data);
          this.$router.push({ path: "/admins" });
        },
        error (error) {
          if (error.toString().search('Not authenticated')) this.$store.dispatch("signOut");
        },
        refetchQueries: [{ query: GET_ADMINS }],
      });
    },
  },
  apollo: {
    admin: {
      query: GET_ADMIN,
      variables() {
        return this.$props;
      },
      update(data) {
        return data.getAdmin.admin;
      },
      error (error) {
        if (error.toString().search('Not authenticated')) this.$store.dispatch("signOut");
      },
    },
  },
};
</script>

<style></style>
