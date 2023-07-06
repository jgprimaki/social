<template>
  <v-app id="app">
    <template v-if="!firstAccess">
      <AppBar></AppBar>
      <Content></Content>
    </template>

    <template v-else>
      <!-- `https://picsum.photos/${windowSize.x}/${windowSize.y}?random&grayscale` -->
      <v-img
        v-resize="onResize"
        src="./assets/img/att-perfil.jpg"
        :max-height="windowSize.y"
        class="img-att-perfil pr-4 d-flex align-center"
      >
        <User></User>
      </v-img>
    </template>

    <SnackBar
      :key="snackbar.message"
      :args="snackbar.args"
      :color="snackbar.color"
      :icon="snackbar.icon"
      :show="snackbar.show"
      :message="snackbar.message"
    ></SnackBar>
  </v-app>
</template>

<style lang="scss">
@import "@/assets/scss/app.scss";
</style>

<style lang="scss">
.img-att-perfil {
  .v-image__image {
    transform: scaleX(-1);
  }
}
</style>

<script>
import { mapState } from "vuex";

import AppBar from "./features/app/AppBar";
import Content from "./features/app/Content";

export default {
  components: {
    AppBar,
    Content,
    SnackBar: () =>
      import(/* webpackChunkName: "snackbar" */ "./components/Snackbar.vue"),
    User: () =>
      import(/* webpackChunkName: "user-create" */ "./features/user/User.vue")
  },
  data() {
    return {
      user: {},
      windowSize: {
        x: 0,
        y: 0
      }
    };
  },
  computed: {
    ...mapState({
      snackbar: "snackbar",
      firstAccess: "firstAccess",
      userData: "userData"
    })
  },
  methods: {
    onResize() {
      this.windowSize = { x: window.innerWidth, y: window.innerHeight };
    }
  },
  mounted() {
    this.onResize();
    if (!this.firstAccess) {
      this.$vuetify.theme.dark = this.userData.theme_dark;
    }
  }
};
</script>
