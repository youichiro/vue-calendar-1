<template>
  <v-row>
    <v-col cols="2" align-self="center" class="d-flex justify-center">
      <v-icon :color="color" size="20px" v-if="icon">${{ icon }}</v-icon>
    </v-col>
    <v-col class="d-flex align-center">
      <slot></slot>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: 'DialogSection',
  props: ['icon', 'color']
};
</script>
