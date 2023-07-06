<template>
  <div id="birthday">
    <Calendar :events="events"></Calendar>
  </div>
</template>

<script>
import { nowYear } from "../helpers/dateUtils";
import UserService from "../models/user.gql";

export default {
  components: {
    Calendar: () =>
      import(/* webpackChunkName: "calendar" */ "../components/Calendar.vue")
  },
  data() {
    return {
      events: []
    };
  },
  methods: {
    rnd(a, b) {
      return Math.floor((b - a + 1) * Math.random()) + a;
    },
    getRandomColor() {
      const colors = [
        "blue",
        "indigo",
        "deep-purple",
        "cyan",
        "green",
        "orange",
        "grey darken-1"
      ];
      return colors[this.rnd(0, colors.length - 1)];
    },
    getBirthday(date) {
      if (!date) return null;

      const [, month, day] = date.split("-");
      return `${nowYear()}-${month}-${day}`;
    }
  },
  apollo: {
    events: {
      query: UserService.getUsersBirthday,
      update(data) {
        const events = [];
        data.users.forEach(el => {
          events.push({
            name: el.name_complete,
            start: this.getBirthday(el.birthday),
            color: this.getRandomColor()
          });
        });
        return events;
      }
    }
  }
};
</script>
