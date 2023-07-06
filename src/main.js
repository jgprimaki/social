import VueKeyCloak from "@dsb-norge/vue-keycloak-js";
import { Settings } from "luxon";
import Vue from "vue";

import App from "./App.vue";
import UserService from "./models/user.gql";
import i18n from "./plugins/i18n";
import { createProvider, onLogin } from "./plugins/vue-apollo";
import vueLogger from "./plugins/vue-logger";
import vuetify from "./plugins/vuetify";
import router from "./router/router";
import store from "./store/store";

import "./plugins/vee-validate";

Vue.config.productionTip = false;
Vue.config.devtools = process.env.NODE_ENV === "development";

Settings.defaultLocale = "pt-br";

Vue.use(VueKeyCloak, {
  config: {
    realm: process.env.VUE_APP_KEYCLOAK_REALM,
    url: process.env.VUE_APP_KEYCLOAK_URL,
    clientId: process.env.VUE_APP_KEYCLOAK_CLIENTID
  },

  init: {
    onLoad: "login-required",
    checkLoginIframe: false
  },

  logout: {
    redirectUri: process.env.VUE_APP_REDIRECT_LOGOUT
  },

  onReady: async keycloak => {
    Vue.$log.info("Autenticated");

    const apolloProvider = createProvider({}, store);
    await onLogin(apolloProvider.defaultClient, keycloak.token);

    await apolloProvider.defaultClient
      .query({
        query: UserService.findByUUID,
        variables: {
          keycloak_uuid: keycloak.subject
        }
      })
      .then(response => {
        const { user } = response.data;
        const firstAccess = !user?.id;
        if (!firstAccess) {
          store.dispatch("setUser", user);
        } else {
          const newUser = {
            name_complete: keycloak?.tokenParsed.given_name,
            email: keycloak?.tokenParsed.email,
            keycloak_uuid: keycloak?.subject,
            theme_dark: false
          };
          store.dispatch("setUser", newUser);
        }
        store.dispatch("setFirstAccess", firstAccess);
      })
      .catch(error => {
        Vue.$log.error("Get User", error);
      });

    new Vue({
      router,
      store,
      vueLogger,
      vuetify,
      i18n,
      apolloProvider,
      render: h => h(App)
    }).$mount("#app");

    Vue.config.warnHandler = msg => {
      const ignoreWarnMessage =
        "The .native modifier for v-on is only valid on components but it was used on <div>.";
      if (msg === ignoreWarnMessage) {
        msg = null;
      }
    };
  },

  onInitError: kc => {
    Vue.$log.error(kc);
  }
});
