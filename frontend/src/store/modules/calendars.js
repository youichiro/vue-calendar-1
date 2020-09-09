import axios from 'axios';

const state = {
  calendars: []
};

const getters = {
  calendars: state => state.calendars
};

const mutations = {
  setCalendars: (state, calendars) => (state.calendars = calendars),
  appendCalendar: (state, calendar) => (state.calendars = [...state.calendars, calendar]),
  updateCalendar: (state, calendar) =>
    (state.calendars = state.calendars.map(c => (c.id === calendar.id ? calendar : c))),
  removeCalendar: (state, calendar) => (state.calendars = state.calendars.filter(c => c.id !== calendar.id))
};

const actions = {
  async fetchCalendars({ commit }) {
    const response = await axios.get('http://localhost:3000/calendars');
    commit('setCalendars', response.data);
  },
  async createCalendar({ commit }, calendar) {
    const response = await axios.post('http://localhost:3000/calendars', calendar);
    commit('appendCalendar', response.data);
  },
  async updateCalendar({ commit }, calendar) {
    const response = await axios.put(`http://localhost:3000/calendars/${calendar.id}`, calendar);
    commit('updateCalendar', response.data);
  },
  async deleteCalendar({ commit }, id) {
    const response = await axios.delete(`http://localhost:3000/calendars/${id}`);
    commit('removeCalendar', response.data);
  }
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};
