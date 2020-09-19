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
import { getTimeIntervalList } from '../../functions/datetime';

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
      return getTimeIntervalList();
    }
  }
};
</script>
