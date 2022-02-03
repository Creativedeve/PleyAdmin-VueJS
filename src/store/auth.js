import { apolloClient } from "@/apollo";
import { AUTH_TOKEN } from "@/constants";
import router from '../router'

const state = {
  user: null,
  language: "da",
  players: null,
  teams: null,
  [AUTH_TOKEN]: null
};

const getters = {
  getUser: state => state.user,
  getToken: () => JSON.parse(localStorage.getItem(AUTH_TOKEN))
};

const mutations = {
  AUTH_STATE_CHANGED(state, user) {
    console.log("state",state)
    console.log("user",user)
    state.user = user;
    console.log("state.user",state.user)
    if (!user) return localStorage.removeItem("user");
    localStorage.setItem("user", JSON.stringify(user));
  },
  SET_TOKEN(state, token) {
    state[AUTH_TOKEN] = token;
    if (!token) return localStorage.removeItem(AUTH_TOKEN);
    localStorage.setItem(AUTH_TOKEN, token);
  },
};

const actions = {
  async checkAuth({ commit }) {
    const user = JSON.parse(localStorage.getItem("user"));
    commit("AUTH_STATE_CHANGED", user);
    if (user) return true;
    return false;
  },
  auth({ commit }, { user, token }) {
    if (user && token) {
      commit("AUTH_STATE_CHANGED", user);
      commit("SET_TOKEN", token);
      return true;
    } else {
      commit("AUTH_STATE_CHANGED", null);
      commit("SET_TOKEN", null);
      return false;
    }
  },
  async signOut({ dispatch }) {
    dispatch("auth", {});
    router.push({ path: "/login" });
    // apolloClient.cache.data.clear();
  }
};

export default {
  namespaced: false,
  state,
  getters,
  mutations,
  actions
};
