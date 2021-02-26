const state = {
  active_model: '/hourweek'
};
const getters = {};
const mutations = {
  UPDATE_ACTIVE_MODEL(state, value) {
    state.active_model = value
  },
};
const actions = {
  update_active_model({
    commit
  }, data) {
    commit("UPDATE_ACTIVE_MODEL", data)
  },

};
export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};
