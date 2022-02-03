<template>
  <div>
    <div id="app" :class="{ 'no-navigation': !showNavigation }">
      <div id="pageloading" v-if="loading"><Loader /></div>
      <toasts></toasts>
      <Navigation v-if="showNavigation" />
      <router-view v-if="user || !$route.secure" />
    </div>
  </div>
</template>

<script>
import router from "./router";
import Navigation from "@/components/Navigation";
import Toasts from "@/components/Toasts";
import Loader from "@/components/Loader";

import { getTeams as GET_TEAMS } from "@/queries/getTeams.gql";
import { getPlayers as GET_PLAYERS } from "@/queries/getPlayers.gql";

export default {
  components: {
    Navigation,
    Toasts,
    Loader,
  },
  computed: {
    showNavigation() {
      return this.user && !this.$route.meta.hideNavigation;
    },
    user() {
      return this.$store.getters.getUser;
    },
    panels() {
      return this.$store.getters.sidepanels;
    },
    loading() {
      return this.$store.getters.loading;
    },
  },
  mounted() {
    this.removeAllPanels();
    window.addEventListener("keyup", (event) => {
      if (event.code === "Escape") this.removePanel();
    });
    this.$store.dispatch("checkAuth");


  },
  watch: {
    panels: function(to) {
      if (to.length > 0) {
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.overflow = "auto";
      }
    },
  },
  apollo: {
    teams: {
      query: GET_TEAMS,
      update(data) {
        this.$store.dispatch("setTeams", data.getTeams.teams);
      },
    },
    players: {
      query: GET_PLAYERS,
      update(data) {
        //return data.getPlayers.players;
        this.$store.dispatch("setPlayers", data.getPlayers.players);
      },
    }
  }
};
</script>

<style lang="less">
@import "./styles/layout";
@import "./styles/snow.min.css";


</style>
