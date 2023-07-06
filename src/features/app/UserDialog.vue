<template>
  <v-row justify="center">
    <v-dialog
      v-model.lazy="dialog"
      max-width="500"
      persistent
      transition="dialog-bottom-transition"
    >
      <User :dialog.sync="dialog"></User>
    </v-dialog>
  </v-row>
</template>

<script>
import { mapState } from "vuex";

export default {
  components: {
    User: () => import(/* webpackChunkName: "user" */ "../user/User.vue")
  },
  props: {
    dialog: Boolean
  },
  computed: {
    ...mapState({
      firstAccess: "firstAccess"
    })
  },
  watch: {
    dialog(val) {
      this.$emit("update:dialog", val);
    }
  }
};
</script>
