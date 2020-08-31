<template>
  <v-menu transition="scale-transition" offset-y min-width="290px">
    <template v-slot:activator="{ on, attrs }">
      <v-btn text v-bind="attrs" v-on="on" class="pa-0">{{ time }}</v-btn>
    </template>
    <v-list max-height="300px">
      <v-list-item v-for="(t, index) in times" :key="index" @click="time = t">
        {{ t }}
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script>
import moment from 'moment';

export default {
  name: 'TimeForm',
  props: ['value', 'label'],
  computed: {
    time: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit('input', value);
      }
    },
    times() {
      const start = moment('2020-08-01 00:00:00');
      const end = moment('2020-08-01 24:00:00');
      let times = [];
      for (let target = start.clone(); target.isBefore(end); target.add(15, 'minutes')) {
        times.push(target.format('HH:mm'));
      }
      return times;
    }
  }
};
</script>
