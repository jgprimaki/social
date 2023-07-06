<template>
  <v-app-bar
    color="#6A76AB"
    src="https://picsum.photos/720/200?random&blur=1"
    app
    absolute
    prominent
    dense
    flat
    dark
  >
    <template v-slot:img="{ props }">
      <v-img
        v-bind="props"
        gradient="to top right, rgba(100,115,201,.6), rgba(25,32,72,.6)"
      ></v-img>
    </template>

    <v-spacer></v-spacer>

    <v-toolbar-title class="font-weight-thin display-1 mb-2">
      DynaSocial
    </v-toolbar-title>

    <div class="action-app-bar">
      <Notification class="notification"></Notification>
      <Perfil class="perfil"></Perfil>
    </div>

    <v-spacer></v-spacer>

    <template v-slot:extension="">
      <v-tabs
        v-model="tab"
        color="apptabs"
        align-with-title
        grow
        background-color="transparent"
      >
        <v-tab v-for="item in items" :key="item.title" :to="item.path">
          <v-icon v-if="item.icon" class="mr-1">{{ item.icon }}</v-icon>
          {{ item.title }}
        </v-tab>
      </v-tabs>
    </template>
  </v-app-bar>
</template>

<style lang="scss">
.action-app-bar {
  display: flex;
  align-items: center;
  position: absolute;
  top: 16px;
  right: 16px;
  > .notification {
    margin-right: 26px;
    margin-top: 7px;
  }
}
</style>

<script>
import AppBarService from "../../services/appBar.services";
import Notification from "./Notification";
import Perfil from "./Perfil";

export default {
  components: {
    Notification,
    Perfil
  },
  mixins: [AppBarService],
  data() {
    return {
      tab: null
    };
  }
};
</script>
