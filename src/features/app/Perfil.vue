<template>
  <div>
    <v-speed-dial
      direction="left"
      transition="scale-transition"
      v-if="$keycloak.authenticated"
    >
      <template v-slot:activator="">
        <v-btn v-model="fab" :color="themeDark ? 'primary' : 'white'" dark fab>
          <v-icon v-if="fab" :color="themeDark ? 'white' : 'primary'"
            >mdi-close</v-icon
          >
          <v-avatar v-else="">
            <img
              :src="
                `https://api.adorable.io/avatars/285/${userData.name_complete}.png`
              "
              alt="avatar"
            />
          </v-avatar>
        </v-btn>
      </template>

      <!-- Edit Perfil -->
      <v-btn @click="dialogUser = true" color="success" fab dark small>
        <v-icon>mdi-pencil</v-icon>
      </v-btn>

      <!-- Change Theme Dark -->
      <v-btn
        :color="themeDark ? 'grey darken-3' : 'white'"
        @click="themeDark = !themeDark"
        fab
        small
        dark
      >
        <v-icon color="primary">
          mdi-theme-light-dark
        </v-icon>
      </v-btn>

      <!-- About DynaSocial -->
      <v-btn @click="dialogAbout = true" color="info" dark fab small>
        <v-icon>mdi-comment-question-outline</v-icon>
      </v-btn>

      <!-- Logout -->
      <v-btn @click="logout" color="red" dark fab small>
        <v-icon>mdi-exit-to-app</v-icon>
      </v-btn>
    </v-speed-dial>

    <UserDialog :dialog.sync="dialogUser" v-if="dialogUser"></UserDialog>
    <AboutDialog :dialog.sync="dialogAbout"></AboutDialog>
  </div>
</template>

<script>
import { mapState } from "vuex";

import UserService from "../../models/user.gql";
import LogoutMixin from "../app/logout.mixin";

export default {
  components: {
    UserDialog: () =>
      import(
        /* webpackChunkName: "userDialog" */ "../../features/app/UserDialog.vue"
      ),
    AboutDialog: () =>
      import(
        /* webpackChunkName: "aboutDialog" */ "../../features/app/AboutDialog.vue"
      )
  },
  data() {
    return {
      fab: false,
      dialogAbout: false,
      dialogUser: false,
      themeDark: false
    };
  },
  mixins: [LogoutMixin],
  computed: {
    ...mapState({
      firstAccess: "firstAccess",
      userData: "userData"
    })
  },
  watch: {
    themeDark(value) {
      this.$vuetify.theme.dark = value;
      this.$apollo.mutate({
        mutation: UserService.updateThemeDark,
        variables: {
          theme_dark: value,
          keycloak_uuid: this.userData.keycloak_uuid
        }
      });
    }
  },
  created() {
    this.themeDark = this.userData?.theme_dark || false;
  }
};
</script>
