import axios from 'axios';

const state = {
  events: [],
  event: null
};

const getters = {
  events: state =>
    state.events.map(event => {
      return {
        ...event,
        start: new Date(event.start),
        end: new Date(event.end),
        color: event.color || 'blue'
      };
    }),
  event: state => state.event
};

const mutations = {
  setEvents: (state, events) => (state.events = events),
  removeEvent: (state, event) => (state.events = state.events.filter(e => e.id !== event.id)),
  setEvent: (state, event) => (state.event = event),
  resetEvent: state => (state.event = null)
};

const actions = {
  async fetchEvents({ commit }) {
    const response = await axios.get('http://localhost:3000/events');
    commit('setEvents', response.data);
  },
  async deleteEvent({ commit }, id) {
    const response = await axios.delete(`http://localhost:3000/events/${id}`);
    commit('removeEvent', response.data);
    commit('resetEvent');
  },
  setEvent({ commit }, event) {
    commit('setEvent', event);
  },
  resetEvent({ commit }) {
    commit('resetEvent');
  }
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};