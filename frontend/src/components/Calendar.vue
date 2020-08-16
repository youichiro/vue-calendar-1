<template>
  <div>
    Calendar.vue
    {{ events }}
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'Calendar',
  computed: {
    ...mapGetters('events', ['events'])
  },
  created() {
    this.fetchEvents();
  },
  methods: {
    ...mapActions('events', ['fetchEvents'])
  }
};
</script>
