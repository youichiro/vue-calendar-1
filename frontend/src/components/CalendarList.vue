<template>
  <v-list dense>
    <v-list-item class="pr-0">
      <v-list-item-content class="caption">マイカレンダー</v-list-item-content>
      <v-list-item-action>
        <v-icon size="12px" @click="init()">$plus</v-icon>
      </v-list-item-action>
    </v-list-item>
    <v-list-item v-for="(calendar, i) in calendars" :key="i" class="pr-0">
      <v-list-item-content class="pa-0 ma-0">
        <v-checkbox
          dense
          v-model="calendar.visibility"
          :color="calendar.color"
          :label="calendar.name"
          @click="toggleVisibility(calendar)"
        ></v-checkbox>
      </v-list-item-content>
      <v-list-item-action>
        <v-menu transition="scale-transition" offset-y min-width="100px">
          <template v-slot:activator="{ on, attrs }">
            <v-icon size="12px" v-bind="attrs" v-on="on">$configMenu</v-icon>
          </template>
          <v-list>
            <v-list-item>編集</v-list-item>
            <v-list-item @click="del(calendar)">削除</v-list-item>
          </v-list>
        </v-menu>
      </v-list-item-action>
    </v-list-item>
    <v-overlay :value="calendar !== null">
      <CalendarFormDialog />
    </v-overlay>
  </v-list>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import CalendarFormDialog from './CalendarFormDialog';

export default {
  name: 'CalendarList',
  components: { CalendarFormDialog },
  computed: {
    ...mapGetters('calendars', ['calendars', 'calendar'])
  },
  created() {
    this.fetchCalendars();
  },
  methods: {
    ...mapActions('calendars', ['fetchCalendars', 'updateCalendar', 'deleteCalendar', 'setCalendar']),
    toggleVisibility(calendar) {
      this.updateCalendar(calendar);
    },
    del(calendar) {
      this.deleteCalendar(calendar.id);
    },
    init() {
      this.setCalendar({
        name: '',
        visibility: true
      });
    }
  }
};
</script>
