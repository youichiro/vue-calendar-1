import axios from 'axios';
import moment from 'moment';

const state = {
  events: [],
  event: null,
  isEditMode: false
};

const getters = {
  events: state =>
    state.events.map(event => {
      const start = new Date(event.start);
      const end = new Date(event.end);
      return {
        ...event,
        start,
        end,
        color: event.color || 'blue',
        startDate: start.getFullYear() + moment(event.start).format('-MM-DD'),
        startTime: event.timed ? moment(event.start).format('HH:mm:ss') : null,
        endDate: end.getFullYear() + moment(event.end).format('-MM-DD'),
        endTime: event.timed ? moment(event.end).format('HH:mm:ss') : null
      };
    }),
  event: state => state.event,
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
