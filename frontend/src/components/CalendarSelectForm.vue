<template>
  <v-menu transition="scale-transition" offset-y>
    <template v-slot:activator="{ on, attrs }">
      <v-btn text v-bind="attrs" v-on="on" class="pa-0">{{ calendar }}</v-btn>
    </template>
    <v-list max-height="300px">
      <v-list-item v-for="(c, i) in calendars" :key="i" @click="calendar = c">
        {{ c.name }}
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'CalendarSelectForm',
  props: ['value'],
  created() {
    this.calendar = this.calendar ? this.calendar.name : this.calendars[0].name;
  },
  computed: {
    ...mapGetters('calendars', ['calendars']),
    calendar: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit('input', value);
      }
    }
  }
};
</script>
