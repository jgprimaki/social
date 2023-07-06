import { onLogout } from "../../plugins/vue-apollo";

export default {
  methods: {
    async logout() {
      await onLogout(this.$apolloProvider.defaultClient, this.$keycloak.token);
      this.$keycloak.logoutFn();
    }
  }
};
