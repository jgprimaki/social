import { mapState } from "vuex";

import {
  formatDateDayMonthYear,
  today,
  plusHour,
  dayMonthLong
} from "../../helpers/dateUtils";
import MeetingService from "../../models/meeting.gql";
import UserService from "../../models/user.gql";

export default {
  data() {
    return {
      form: {
        dates: today(),
        color: "#2196f3",
        room: 1,
        note: "",
        members: [],
        timeStart: null,
        timeEnd: null,
        topic: ""
      },
      max: 65,
      expand: false,
      loadingMembers: false
    };
  },
  computed: {
    ...mapState({
      userData: state => state.userData
    }),
    dateFormatted() {
      let dateFormatted = today();
      if (this.form.dates) {
        dateFormatted = formatDateDayMonthYear(this.form.dates);
      }
      return dateFormatted;
    },
    today() {
      return today();
    },
    timeEndMin() {
      return plusHour(this.form.timeStart);
    }
  },
  methods: {
    async onSubmit() {
      const validated = await this.$refs.form.validate();
      if (!validated) {
        return;
      }

      const variables = {
        name: this.form.topic,
        start_date: this.form.dates,
        end_date: this.form.dates,
        start_time: this.form.timeStart,
        end_time: this.form.timeEnd,
        description: this.form.note,
        color: this.form.color,
        room: this.form.room,
        user: this.userData.id,
        active: true,
        members: this.form.members.map(t => t.id)
      };

      await this.$apollo
        .mutate({
          mutation: MeetingService.create,
          variables
        })
        .then(() => {
          const { start_date, start_time, end_time, room } = variables;
          this.$store.dispatch("showMessage", {
            show: true,
            message: "meeting.created",
            color: "success",
            args: [dayMonthLong(start_date), start_time, end_time, room]
          });

          this.onReset();
        })
        .catch(e => {
          this.$log.error(e);
          const snackbar = {
            show: true,
            message: "meeting.error",
            color: "error",
            args: ["agendar"]
          };
          this.$store.dispatch("showMessage", snackbar);
        });
    },

    onReset() {
      this.form = {
        dates: today(),
        color: "#2196f3",
        room: 1,
        note: "",
        members: [],
        timeStart: null,
        timeEnd: null,
        topic: ""
      };

      requestAnimationFrame(() => {
        this.$refs.form.reset();
      });
    },

    allowedStep: m => m % 5 === 0
  },
  apollo: {
    memberItems: {
      query: UserService.getMembers,
      update: data => data.users,
      watchLoading(isLoading) {
        this.loadingMembers = isLoading;
      }
    }
  },
  created() {
    const self = {
      id: this.userData.id,
      name_complete: this.userData.name_complete
    };
    this.form.members = [self];
  }
};
