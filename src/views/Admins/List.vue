<template>
  <div>
    <div class="page-actions">
      <h2>Admins</h2>
      <div>
        <router-link to="/admins/invite" tag="button" @click="addAdmin">Invite admin</router-link>
      </div>
    </div>
    <vue-good-table
      v-if="admins"
      :search-options="{ enabled: true }"
      :sort-options="{
        enabled: false,
      }"
      :columns="columns"
      :rows="admins"
    />
    <sidepanel id="panel-create-admin" title="Create admin"></sidepanel>
  </div>
</template>

<script>
import { getAdmins as GET_ADMINS } from "@/queries/getAdmins.gql";

export default {
  name: "Admins",
  data() {
    return {
      columns: [
        {
          label: "Name",
          field: this.renderName
        },
        {
          label: "E-mail",
          field: "email"
        },
        {
          label: "Status",
          field: this.renderStatus
        },
        {
          label: "Role",
          field: this.roleFromId
        },
      ]
    };
  },
  methods: {
    roleFromId(rowObj) {
      switch (rowObj.roleIds[0]) {
        case "2zg3BSH5gT5XZXXErzH4":
          return "Super Admin"
        break;
        case "6tMiEdemlWcRUA7oImbl":
          return "Admin"
        break;
        case "TfdAmPOAK4OLuQ73Nlo3":
          return "Editor"
        break;
      }
    },
    renderName(rowObj) {
      return rowObj.firstName + ' ' + rowObj.lastName
    },
    renderStatus(rowObj) {
      switch(rowObj.status) {
        case "ACTIVE":
          return "Active"
          break
        case "PENDING_USER":
          return "Pending user"
          break
      }
    },
    addAdmin() {},
    fieldEdit(rowObj) {
      return 
    },
    rowClick({ row }) {
      this.$router.push({ path: "/admins/" + row.id });
    },
    createAdmin() {
      this.addPanel("panel-create-admin");
    }
  },
  apollo: {
    admins: {
      query: GET_ADMINS,
      update(data) {
        return data.getAdmins.admins;
      },
      error (error) {
        if (error.toString().search('Not authenticated')) this.$store.dispatch("signOut");
      },
    }
  }
};
</script>
