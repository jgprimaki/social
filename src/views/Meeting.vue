<template>
  <div id="meeting">
    <NewMeeting></NewMeeting>
    <Calendar
      :event-name="eventCalendarDescription"
      :events="eventsFilter"
      @eventCancel="eventCancel"
    >
      <template slot="extraElement">
        <v-col class="d-flex mt-3" lg="2">
          <v-select
            v-model="selectedRoom"
            :items="rooms"
            @change="changeRoom"
          ></v-select>
        </v-col>
      </template>
    </Calendar>
  </div>
</template>
<script>
import { dayMonthLong } from "../helpers/dateUtils";
import Meeting from "../models/meeting.gql";

export default {
  components: {
    Calendar: () =>
      import(/* webpackChunkName: "calendar" */ "../components/Calendar.vue"),
    NewMeeting: () =>
      import(
        /* webpackChunkName: "newMeeting" */ "../features/meeting/NewMeeting.vue"
      )
  },
  data() {
    return {
      events: [],
      //
      eventsFilter: [],
      selectedRoom: 0
    };
  },
  computed: {
    rooms() {
      const rooms = [
        { text: "Todos", value: 0 },
        { text: this.selectedRoomDescription(1), value: 1 },
        { text: this.selectedRoomDescription(2), value: 2 }
      ];
      return rooms;
    }
  },
  watch: {
    events() {
      this.eventsFilter = this.events;
    }
  },
  methods: {
    async eventCancel(id) {
      await this.$apollo
        .mutate({
          mutation: Meeting.cancel,
          variables: {
            id
          }
        })
        .then(() => {
          const snackbar = {
            show: true,
            message: "meeting.canceled",
            color: "info"
          };
          this.$store.dispatch("showMessage", snackbar);
        })
        .catch(e => {
          this.$log.error(e);
          const snackbar = {
            show: true,
            message: "meeting.error",
            color: "error",
            args: ["cancelar"]
          };
          this.$store.dispatch("showMessage", snackbar);
        });
    },
    updateMeetings(data) {
      this.events.push(this.meetingDTO(data.meetingCreated));
    },
    removeMeeting(data) {
      const { id } = data.meetingCanceled;
      this.events.splice(
        this.events.findIndex(x => x.id == id),
        1
      );
    },
    meetingDTO(meeting = {}) {
      const start = `${meeting.start_date} ${meeting.start_time}`;
      const end = `${meeting.end_date} ${meeting.end_time}`;
      const dto = {
        start,
        end,
        details: this.details(meeting),
        ...meeting
      };
      return dto;
    },
    meetings(meetings = {}) {
      return meetings.map(meeting => this.meetingDTO(meeting));
    },
    eventCalendarDescription(event = {}) {
      const { room, name } = event.input;
      const { time } = event.start;
      const showRoom =
        this.selectedRoom == 0 ? `${this.selectedRoomDescription(room)} -` : "";
      return `${showRoom} ${time} ${name}`;
    },
    changeRoom() {
      if (this.selectedRoom > 0) {
        this.eventsFilter = this.events.filter(
          e => e.room === this.selectedRoom
        );
      } else {
        this.eventsFilter = this.events;
      }
    },
    selectedRoomDescription(room = 1) {
      return this.$t(`meeting.room.${room == 1 ? "conf" : "floor"}`);
    },
    details(meeting = {}) {
      const { start_date, start_time, end_time, room, description } = meeting;
      const text = `${this.$t("meeting.created", [
        dayMonthLong(start_date),
        start_time,
        end_time,
        room
      ])}
            na
            ${this.selectedRoomDescription(meeting.room)}. 
            ${description ? " Obs: " + description : description}`;
      return text;
    }
  },
  apollo: {
    events: {
      query: Meeting.load,
      update(data) {
        return this.meetings(data.meetings);
      },
      variables: {
        filter: "active: true"
      },
      subscribeToMore: {
        document: Meeting.meetingCreated,
        updateQuery(_, { subscriptionData }) {
          this.updateMeetings(subscriptionData.data);
        }
      }
    },
    $subscribe: {
      meetingCanceled: {
        query: Meeting.meetingCanceled,
        result({ data }) {
          this.removeMeeting(data);
        }
      }
    }
  }
};
</script>
