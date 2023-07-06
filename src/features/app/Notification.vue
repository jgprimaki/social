<template>
  <div>
    <v-menu :close-on-content-click="false" offset-y width="350" left bottom>
      <template v-slot:activator="{ on }">
        <v-btn icon large v-on="on">
          <v-badge
            :content="notificatonCount"
            :value="notificatonCount"
            color="primary"
            overlap
          >
            <v-icon>mdi-bell-ring</v-icon>
          </v-badge>
        </v-btn>
      </template>
      <v-list class="pa-0" dense width="350">
        <v-list-item
          v-for="(notification, index) in notifications"
          :key="index"
          class="pa-0"
          dense
        >
          <v-alert
            :color="notification.color"
            :icon="notification.icon"
            class="alert-margin"
            dark
            border="left"
            dense
            dismissible
          >
            <span v-html="notification.description" class="caption"></span>
            <template slot="close">
              <v-btn
                @click.stop="deactivateNotification(notification)"
                class="ma-1"
                icon
                small
                dark
                ><v-icon>mdi-close-circle-outline</v-icon></v-btn
              >
            </template>
          </v-alert>
        </v-list-item>
        <v-list-item v-if="!hasNotifications">
          <v-list-item-title>
            {{ $t("notification.empty") }}
          </v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </div>
</template>

<style lang="scss" scoped>
.alert-margin {
  margin-bottom: 1px;
}
</style>

<script>
import { mapState } from "vuex";

import NotificationService from "../../models/notification.gql";

export default {
  data() {
    return {
      notifications: []
    };
  },
  computed: {
    ...mapState({
      userData: state => state.userData
    }),
    notificatonCount() {
      return this.notifications.length;
    },
    hasNotifications() {
      return this.notifications.length > 0;
    }
  },
  methods: {
    removeNotification(id) {
      const index = this.notifications.findIndex(
        notification => notification.id === id
      );
      this.notifications.splice(index, 1);
    },
    deactivateNotification(notification) {
      const { id } = notification;
      this.$apollo.mutate({
        mutation: NotificationService.deactivateNotification,
        variables: {
          id
        }
      });

      this.removeNotification(id);
    }
  },
  apollo: {
    notifications: {
      query: NotificationService.load,
      variables() {
        return {
          filter: `user: '${this.userData.id}', active: true`,
          sort: "createdAt:-1"
        };
      },
      subscribeToMore: {
        document: NotificationService.notificationCreated,
        updateQuery(_, { subscriptionData }) {
          const { notificationCreated } = subscriptionData.data;
          this.notifications.unshift(notificationCreated);
        },
        variables() {
          return {
            user: this.userData.id
          };
        }
      }
    }
  }
};
</script>
