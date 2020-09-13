import axios from 'axios';

const state = {
  calendars: [],
  calendar: null
};

const getters = {
  calendars: state =>
    state.calendars.map(calendar => {
      return { ...calendar, color: calendar.color || '#2196F3' };
    }),
  calendar: state => {
    if (state.calendar === null) {
      return null;
    }
    return { ...state.calendar, color: state.calendar.color || '#2196F3' };
  }
};

const mutations = {
  setCalendars: (state, calendars) => (state.calendars = calendars),
  appendCalendar: (state, calendar) => (state.calendars = [...state.calendars, calendar]),
  updateCalendar: (state, calendar) =>
    (state.calendars = state.calendars.map(c => (c.id === calendar.id ? calendar : c))),
  removeCalendar: (state, calendar) => (state.calendars = state.calendars.filter(c => c.id !== calendar.id)),
  setCalendar: (state, calendar) => (state.calendar = calendar),
  resetCalendar: state => (state.calendar = null)
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
  async updateCalendar({ dispatch, commit }, calendar) {
    const response = await axios.put(`http://localhost:3000/calendars/${calendar.id}`, calendar);
    commit('updateCalendar', response.data);
    dispatch('events/fetchEvents', null, { root: true });
  },
  async deleteCalendar({ dispatch, commit }, id) {
    const response = await axios.delete(`http://localhost:3000/calendars/${id}`);
    commit('removeCalendar', response.data);
    dispatch('events/fetchEvents', null, { root: true });
  },
  setCalendar({ commit }, calendar) {
    commit('setCalendar', calendar);
  },
  resetCalendar({ commit }) {
    commit('resetCalendar');
  }
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};
