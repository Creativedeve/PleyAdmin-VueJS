const state = {
  teams: []
};

const getters = {
  getTeams: state => state.teams
};

const mutations = {
  SET_TEAMS(state, payload) {
    state.teams = payload;
  },
};

const actions = {
  setTeams({ commit }, payload) {
    commit("SET_TEAMS", payload);
    if (!payload) return localStorage.removeItem('teams');
    localStorage.setItem('teams', payload);
  },
}

export default {
  namespaced: false,
  state,
  mutations,
  getters,
  actions
};
