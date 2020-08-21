<template>
  <v-text-field type="time" v-model="time" :label="label"></v-text-field>
</template>

<script>
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
    }
  }
};
</script>
