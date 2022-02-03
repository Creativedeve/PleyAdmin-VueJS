const state = {
  sidepanels: [],
  toasts: [],
  loading: 0,
};

const getters = {
  sidepanels: (state) => state.sidepanels,
  sidepanelCount: (state) => state.sidepanels.length,
  panelDepth: (state) => (id) => {
    return (
      state.sidepanels.length -
      1 -
      state.sidepanels.findIndex((panel) => panel.id === id)
    );
  },
  sidepanel: (state) => (id) => {
    const panels = state.sidepanels.filter((panel) => panel.id === id);
    if (panels.length > 0) return panels[0];
    return null;
  },
  toasts: (state) => state.toasts,
  toastDepth: (state) => (id) => {
    return (
      state.toasts.length -
      1 -
      state.toasts.findIndex((toast) => toast.id === id)
    );
  },
  loading: (state) => state.loading > 0,
};

const mutations = {
  ADD_PANEL(state, payload) {
    console.log("add_panel...")
    if (
      state.sidepanels.filter((elem) => elem.id === payload.id).length === 0
    ) {
      state.sidepanels.push(payload);
    }
  },
  REMOVE_PANEL(state, payload) {
    if (payload.panelId) {
      state.sidepanels = state.sidepanels.filter(
        (panel) => panel.id !== payload.panelId
      );
    } else {
      if (state.sidepanels.length > 0) state.sidepanels.splice(-1, 1);
    }
  },
  REMOVE_ALL_PANELS(state) {
    state.sidepanels.splice(0, state.sidepanels.length);
  },
  ADD_TOAST(state, payload) {
    payload.id = Math.floor(Math.random() * 100000000);
    state.toasts.push(payload);
    setTimeout(() => {
      const index = state.toasts.findIndex((toast) => toast.id === payload.id);
      state.toasts.splice(index, 1);
    }, 2000);
  },
  REMOVE_TOAST(state) {
    state.toasts.splice(-1, 1);
  },
  REMOVE_ALL_TOASTS(state) {
    state.toasts.splice(0, state.toasts.length);
  },
  LOADING_CHANGE(state, value) {
    state.loading += value;
  },
};

const actions = {
  addPanel: function(context, payload) {
    context.commit("ADD_PANEL", payload);
  },
  removePanel: function(context, payload) {
    context.commit("REMOVE_PANEL", payload);
  },
  removeAllPanels: function(context) {
    context.commit("REMOVE_ALL_PANELS");
  },
  addToast: function(context, payload) {
    context.commit("ADD_TOAST", payload);
  },
  removeToast: function(context) {
    context.commit("REMOVE_TOAST");
  },
  removeAllToasts: function(context) {
    context.commit("REMOVE_ALL_TOASTS");
  },
  loadingInc: function({ commit }) {
    commit("LOADING_CHANGE", 1);
  },
  loadingDec: function({ commit }) {
    commit("LOADING_CHANGE", -1);
  },
};

export default {
  namespaced: false,
  state,
  getters,
  mutations,
  actions,
};
