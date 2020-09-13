import '@fortawesome/fontawesome-free/css/all.css'
import Vue from "vue";
import Vuetify from "vuetify/lib";

Vue.use(Vuetify);

export default new Vuetify({
  icons: {
    iconfont: 'fa',
    values: {
      squareRegular: 'far fa-square',
      squareSolid: 'fas fa-square',
      circleSolid: 'fas fa-circle',
      edit: 'fas fa-edit',
      trash: 'fas fa-trash',
      calendar: 'fas fa-calendar-day',
      palette: 'fas fa-palette',
      textarea: 'fas fa-align-left',
      close: 'mdi-close',
      arrowLeft: 'mdi-chevron-left',
      arrowRight: 'mdi-chevron-right',
      arrowDown: 'fas fa-caret-down',
      clock: 'far fa-clock',
      plus: 'fas fa-plus'
    }
  }
});
