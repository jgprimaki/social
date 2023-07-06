<template>
  <v-card class="pa-2 mt-5">
    <Toolbar
      :showNext="showNext"
      :showPrev="showPrev"
      :title="title"
      :type.sync="type"
      @next="next"
      @prev="prev"
      @setToday="setToday"
    >
      <template slot="extraElement">
        <slot name="extraElement"></slot>
      </template>
    </Toolbar>

    <v-calendar
      ref="calendar"
      v-model="focus"
      :event-color="getEventColor"
      :event-more="true"
      :event-name="getEventName"
      :events="events"
      :type="type"
      @change="updateRange"
      @click:date="viewDay"
      @click:event="showEvent"
      @click:more="viewDay"
      color="primary"
      locale="pt"
      event-more-text="Mais eventos"
    ></v-calendar>

    <Menu
      :selectedElement="selectedElement"
      :selectedEvent="selectedEvent"
      :selectedOpen="selectedOpen"
      @eventCancel="eventCancel"
      @selectedOpen="selectedOpen = $event"
    ></Menu>
  </v-card>
</template>

<style lang="scss">
.v-calendar-daily__scroll-area {
  overflow-y: auto;
}

.v-calendar .v-event {
  width: 100% !important;
  margin-top: 2px;
}
</style>

<script>
export default {
  components: {
    Toolbar: () =>
      import(/* webpackChunkName: "toolbar" */ "./calendar/Toolbar.vue"),
    Menu: () => import(/* webpackChunkName: "menu" */ "./calendar/Menu.vue")
  },
  data: () => ({
    focus: "",
    type: "month",
    today: null,
    start: null,
    showPrev: true,
    showNext: true,
    end: null,
    selectedEvent: {},
    selectedElement: null,
    selectedOpen: false
  }),
  props: {
    events: {
      type: Array,
      required: true
    },
    eventName: Function
  },
  computed: {
    title() {
      const { start, end } = this;
      if (!start || !end) {
        return "";
      }
      const startMonth = this.monthFormatter(start);
      const startYear = start.year;
      return `${startMonth} ${startYear}`;
    },
    monthFormatter() {
      return this.$refs.calendar.getFormatter({
        timeZone: "UTC",
        month: "long"
      });
    }
  },
  methods: {
    getEventColor(event) {
      return event.color;
    },
    getEventName(event) {
      if (this.eventName) {
        return this.eventName(event);
      } else {
        return `${event.start.time} ${event.input.name}`;
      }
    },
    setToday() {
      this.focus = this.today;
    },
    prev() {
      this.$refs.calendar.prev();
      this.setShowPrevNext();
    },
    next() {
      this.$refs.calendar.next();
      this.setShowPrevNext();
    },
    setShowPrevNext() {
      setTimeout(() => {
        if (this.start.month === 1) {
          this.showPrev = false;
        } else {
          this.showPrev = true;
        }

        if (this.start.month === 12) {
          this.showNext = false;
        } else {
          this.showNext = true;
        }
      }, 100);
    },
    showEvent({ nativeEvent, event }) {
      const open = () => {
        this.selectedEvent = event;
        this.selectedElement = nativeEvent.target;
        setTimeout(() => (this.selectedOpen = true), 10);
      };

      if (this.selectedOpen) {
        this.selectedOpen = false;
        setTimeout(open, 10);
      } else {
        open();
      }

      nativeEvent.stopPropagation();
    },
    updateRange({ start, end }) {
      this.start = start;
      this.end = end;
    },
    viewDay({ date }) {
      this.focus = date;
      this.type = "day";
    },
    eventCancel(id) {
      this.$emit("eventCancel", id);
    }
  },
  mounted() {
    this.$refs.calendar.checkChange();
    this.setShowPrevNext();
  }
};
</script>
