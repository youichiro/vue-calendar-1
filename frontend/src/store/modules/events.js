import axios from 'axios';
import { serializeEvent } from '../../functions/serializers';
import { filterEventsByDate } from '../../functions/filters';

const state = {
  events: [],
  event: null,
  isEditMode: false,
  clickedDate: null
};

const getters = {
  events: state => state.events.filter(event => event.calendar.visibility).map(event => serializeEvent(event)),
  event: state => serializeEvent(state.event),
  eventsFilterByDate: state => filterEventsByDate(state.events, state.clickedDate),
  isEditMode: state => state.isEditMode,
  clickedDate: state => state.clickedDate
};

const mutations = {
  setEvents: (state, events) => (state.events = events),
  removeEvent: (state, event) => (state.events = state.events.filter(e => e.id !== event.id)),
  updateEvent: (state, event) => (state.events = state.events.map(e => (e.id === event.id ? event : e))),
  appendEvent: (state, event) => (state.events = [...state.events, event]),
  setEvent: (state, event) => (state.event = event),
  resetEvent: state => (state.event = null),
  setEditMode: (state, bool) => (state.isEditMode = bool),
  setClickedDate: (state, date) => (state.clickedDate = date)
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
  async createEvent({ commit }, event) {
    const response = await axios.post('http://localhost:3000/events', event);
    commit('appendEvent', response.data);
  },
  setEvent({ commit }, event) {
    commit('setEvent', event);
  },
  resetEvent({ commit }) {
    commit('resetEvent');
  },
  setEditMode({ commit }, bool) {
    commit('setEditMode', bool);
  },
  setClickedDate({ commit }, date) {
    commit('setClickedDate', date);
  }
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};
