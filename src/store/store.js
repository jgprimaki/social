import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    userData: {},
    firstAccess: true,
    snackbar: {
      show: false
    }
  },
  getters: {},
  mutations: {
    setUser(state, userData) {
      state.userData = userData;
    },
    setFirstAccess(state, firstAccess) {
      state.firstAccess = firstAccess;
    },
    showMessage(state, properties) {
      state.snackbar = properties;
    },
    showSnackbar(state, show) {
      state.snackbar.show = show;
    }
  },
  actions: {
    setUser: ({ commit }, userData) => commit("setUser", userData),
    setFirstAccess: ({ commit }, firstAccess) =>
      commit("setFirstAccess", firstAccess),
    showMessage: ({ commit }, properties) => commit("showMessage", properties),
    showSnackbar: ({ commit }, show) => commit("showSnackbar", show)
  },
  modules: {}
});
