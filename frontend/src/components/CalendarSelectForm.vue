<template>
  <v-menu transition="scale-transition" offset-y>
    <template v-slot:activator="{ on, attrs }">
      <v-btn depressed v-bind="attrs" v-on="on">{{ calendar ? calendar.name : '' }}</v-btn>
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
  computed: {
    ...mapGetters('calendars', ['calendars']),
    calendar: {
      get() {
        if (!this.value) {
          this.$emit('input', this.calendars[0]);
        }
        return this.value;
      },
      set(value) {
        this.$emit('input', value);
      }
    }
  }
};
</script>
