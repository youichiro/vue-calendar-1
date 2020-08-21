<template>
  <v-card light width="600">
    <v-card-actions class="d-flex justify-end pa-2">
      <v-btn icon @click="close">
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </v-card-actions>
    <v-card-text>
      <v-text-field v-model="title" label="タイトル" required></v-text-field>
    </v-card-text>
    <v-card-actions class="d-flex justify-end">
      <v-btn @click="cancel">キャンセル</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { validationMixin } from 'vuelidate';
import { required } from 'vuelidate/lib/validators';
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'FormDialog',
  mixins: [validationMixin],
  validations: {
    title: { required }
  },
  data: () => ({
    title: ''
  }),
  computed: {
    ...mapGetters('events', ['event'])
  },
  created() {
    this.title = this.event.title;
  },
  methods: {
    ...mapActions('events', ['resetEvent', 'setEditMode']),
    close() {
      this.resetEvent();
      this.setEditMode(false);
    },
    cancel() {
      this.setEditMode(false);
    }
  }
};
</script>
