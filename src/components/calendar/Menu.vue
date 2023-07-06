<template>
  <v-menu
    v-model="selectedOpen"
    :activator="selectedElement"
    :close-on-content-click="false"
    offset-x
    max-width="350"
  >
    <v-card min-width="300">
      <v-toolbar :color="selectedEvent.color" dark>
        <v-toolbar-title>{{ selectedEvent.name }}</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn v-if="selectedEvent.heart" icon>
          <v-icon>mdi-heart</v-icon>
        </v-btn>
        <v-btn @click="closeMenu" icon>
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-toolbar>
      <v-card-text v-if="selectedEvent.details">
        {{ selectedEvent.details }}
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          v-if="hasPermissionCanceled"
          @click="cancel"
          color="red"
          x-small
          dark
          block
        >
          <v-icon class="mr-1" x-small>mdi-cancel</v-icon>Cancelar
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-menu>
</template>

<script>
import { mapState } from "vuex";

export default {
  props: {
    selectedEvent: {
      type: Object,
      required: true
    },
    selectedElement: {
      required: true
    },
    selectedOpen: {
      type: Boolean,
      required: true
    }
  },
  computed: {
    ...mapState({
      userData: state => state.userData
    }),
    hasPermissionCanceled() {
      return (
        this.selectedOpen && this.userData.id === this.selectedEvent.user.id
      );
    }
  },
  methods: {
    closeMenu() {
      this.$emit("selectedOpen", false);
    },
    cancel() {
      this.$emit("eventCancel", this.selectedEvent.id);
      this.closeMenu();
    }
  }
};
</script>
