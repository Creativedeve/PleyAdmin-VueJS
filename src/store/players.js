const state = {
  players: []
};

const getters = {
  getPlayers: state => state.players
};

const mutations = {
  SET_PLAYERS(state, payload) {
    state.players = payload;
  },
};

const actions = {
  setPlayers({ commit }, payload) {
    commit("SET_PLAYERS", payload);
    if (!payload) return localStorage.removeItem('players');
    localStorage.setItem('players', payload);
  },
}

export default {
  namespaced: false,
  state,
  mutations,
  getters,
  actions
};
