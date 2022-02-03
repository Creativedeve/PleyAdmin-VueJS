import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

import Auth from "./auth";
import Chrome from "./chrome";
import Players from "./players";
import Teams from "./teams";

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    Auth,
    Chrome,
    Players,
    Teams
  },
});
