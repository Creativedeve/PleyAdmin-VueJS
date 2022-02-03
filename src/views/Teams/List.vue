<template>
  <div>
    <div class="page-actions">
      <h2>Teams</h2>
      <div>
      </div>
    </div>
    <vue-good-table
      v-if="teams"
      :search-options="{ enabled: true }"
      :sort-options="{
        enabled: true,
        initialSortBy: { field: 'name', type: 'asc' }
      }"
      :columns="columns"
      :rows="teams"
      @on-row-click="rowClick"
      @on-cell-click="cellClick"/>
  </div>
</template>

<script>
import { getTeams as GET_TEAMS } from "@/queries/getTeams.gql";

export default {
  name: "Teams",
  data() {
    return {
      columns: [
        {
          label: "Name",
          field: 'name',
          html: true,
        },
      ]
    };
  },
  methods: {
    rowClick({ row }) {
      return
    },
    cellClick(params) {
      if (params.column.label != "Actions") {
        this.edit(params.row)
      }
    },
    edit(row) {
      this.$router.push({ path: "/teams/" + row.id });
    },
  },
  apollo: {
    teams: {
      query: GET_TEAMS,
      update(data) {
        return data.getTeams.teams;
      },
      error (error) {
        if (error.toString().search('Not authenticated')) this.$store.dispatch("signOut");
      },
    }
  }
};
</script>
