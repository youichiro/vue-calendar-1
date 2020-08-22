import axios from 'axios';
import { serializeEvent } from '../../functions/serializers';

const state = {
  events: [],
  event: null,
  isEditMode: false
};

const getters = {
  events: state => state.events.map(event => serializeEvent(event)),
  event: state => serializeEvent(state.event),
  isEditMode: state => state.isEditMode
};

const mutations = {
  setEvents: (state, events) => (state.events = events),
  removeEvent: (state, event) => (state.events = state.events.filter(e => e.id !== event.id)),
  updateEvent: (state, event) =>
    (state.events = state.events.map(e => (e.id === event.id ? event : e))),
  setEvent: (state, event) => (state.event = event),
  resetEvent: state => (state.event = null),
  setEditMode: (state, bool) => (state.isEditMode = bool)
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
  async updateEvent({ commit }, event) {
    const response = await axios.put(`http://localhost:3000/events/${event.id}`, event);
    commit('updateEvent', response.data);
  },
  setEvent({ commit }, event) {
    commit('setEvent', event);
  },
  resetEvent({ commit }) {
    commit('resetEvent');
  },
  setEditMode({ commit }, bool) {
    commit('setEditMode', bool);
  }
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};
