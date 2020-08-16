import axios from 'axios';

const state = {
  events: []
};

const getters = {
  events: state => state.events
};

const mutations = {
  setEvents: (state, events) => (state.events = events)
};

const actions = {
  async fetchEvents({ commit }) {
    const response = await axios.get('http://localhost:3000/events');
    commit('setEvents', response.data);
  }
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};
