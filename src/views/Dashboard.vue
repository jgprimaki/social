<template>
  <div id="dashboard">
    <v-row>
      <v-col v-for="(card, i) in dashboards" :key="i" :md="card.cols" cols="12">
        <v-card :color="card.color" dark>
          <div class="d-flex flex-no-wrap justify-space-between">
            <div>
              <v-card-title v-text="card.title" class="headline"></v-card-title>
              <v-card-subtitle v-text="card.subtitle"></v-card-subtitle>

              <v-card-text>
                <template v-if="card.items.length">
                  <span
                    v-for="(item, j) in card.items"
                    v-html="item + '<br />'"
                    :key="j"
                    class="subtitle-1"
                  >
                  </span>
                </template>
                <span v-else class="subtitle-1">
                  Nenhum item encontrado!
                </span>
              </v-card-text>
            </div>

            <v-avatar class="ma-3" size="125" tile>
              <v-icon class="display-4">{{ card.icon }}</v-icon>
            </v-avatar>
          </div>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import axios from "axios";

import {
  today,
  nowMonth,
  nowMonthLong,
  formatDateDayMonthYear
} from "../helpers/dateUtils";
import MeetingService from "../models/meeting.gql";
import UserService from "../models/user.gql";

const BIRTHDAY = "birthday";
const MEETING = "meeting";
const README = "readme";
//const CAKEDAY = "cakeday";

export default {
  data: () => ({
    dashboards: [
      {
        id: MEETING,
        color: "#385F73",
        icon: "mdi-google-classroom",
        title: "Reuniões do dia",
        subtitle: "Veja os horários das suas reuniões",
        cols: 6,
        items: []
      },
      {
        id: BIRTHDAY,
        color: "#1F7087",
        icon: "mdi-cake-variant",
        title: "Aniversariantes",
        subtitle: `Aniversariantes do mês de ${nowMonthLong()}`,
        cols: 6,
        items: []
      },
      {
        id: README,
        color: "deep-purple darken-1",
        icon: "mdi-newspaper-variant-multiple-outline",
        title: "Readme",
        subtitle: "Último Readme postado",
        cols: 6,
        items: []
      }
    ]
  }),
  methods: {
    async getReadme() {
      const response = await axios.get(
        `${process.env.VUE_APP_API_BASE_PATH}/dashboard/readme`
      );
      const { name, send_time } = response.data[0];
      this.dashboards.forEach(item => {
        if (item.id === README) {
          const sendDate = formatDateDayMonthYear(
            send_time.substr(0, send_time.indexOf("T"))
          );
          const desc = `${name} <br /> Publicado: ${sendDate}`;
          item.items = [desc];
        }
      });
    }
  },
  apollo: {
    birthdays: {
      query: UserService.getUsersBirthday,
      update(data) {
        if (!data) return [];

        const { users } = data;
        this.dashboards.forEach(item => {
          if (item.id === BIRTHDAY) {
            const _items = [];
            users.forEach(u => _items.push(u.name_complete));
            item.items = _items;
          }
        });
      },
      variables() {
        return {
          filter: `birthday: { $regex: '${nowMonth()}-' }`
        };
      }
    },
    meetings: {
      query: MeetingService.load,
      update(data) {
        if (!data) return [];

        const { meetings } = data;
        this.dashboards.forEach(item => {
          if (item.id === MEETING) {
            const _items = [];
            meetings.forEach(m => _items.push(`${m.start_time} - ${m.name}`));
            item.items = _items;
          }
        });
      },
      variables() {
        return {
          filter: `start_date: { $regex: '${today()}' }, user: '${
            this.$store.state.userData.id
          }', active: true`
        };
      }
    }
  },
  created() {
    this.getReadme();
  }
};
</script>
