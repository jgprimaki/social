import { mapState } from "vuex";

import { formatDateDayMonthYear, today } from "../../helpers/dateUtils";
import TeamService from "../../models/team.gql";
import UserService from "../../models/user.gql";
import LogoutMixin from "../app/logout.mixin";

export default {
  mixins: [LogoutMixin],
  data() {
    return {
      form: {
        keycloak_uuid: "",
        name_complete: "",
        email: "",
        birthday: null,
        pis: "",
        teams: [],
        cake_teams: [],
        phone: "",
        studying: false
      },
      today: today(),
      menuBirthday: false,
      birthdayFormatted: "",
      piss_max: 0,
      teamItems: [],
      cakeItems: []
    };
  },
  props: {
    dialog: Boolean
  },
  computed: {
    ...mapState({
      userData: "userData",
      firstAccess: "firstAccess"
    })
  },
  watch: {
    menuBirthday(val) {
      val &&
        requestAnimationFrame(
          () => (this.$refs.pickerBirthday.activePicker = "YEAR")
        );
    },
    "form.birthday"() {
      this.birthdayFormatted = formatDateDayMonthYear(this.form.birthday);
    }
  },
  methods: {
    async onSubmit() {
      const validated = await this.$refs.form.validate();
      if (!validated) {
        return;
      }

      if (this.isEquals()) {
        this.createdPerfil();
      } else {
        this.form.cake_teams = this.form.cake_teams?.map(c => c.id);
        this.form.teams = this.form.teams?.map(t => t.id);

        await this.$apollo
          .mutate({
            mutation: UserService.createUser,
            variables: this.form
          })
          .then(response => {
            const { createUser: user } = response.data;
            this.$store.dispatch("setUser", user);
            this.$store.dispatch("setFirstAccess", false);

            this.createdPerfil();
          })
          .catch(error => {
            this.$log.error(error);

            const snackBar = {
              show: true,
              message: "user.error",
              color: "error"
            };
            this.$store.dispatch("showMessage", snackBar);
          });
      }
    },

    toUpperCase: function(value) {
      if (!value) return "";
      value = value.toString();
      return value.charAt(0).toUpperCase() + value.slice(1);
    },

    canceled() {
      if (!this.firstAccess) {
        this.$emit("update:dialog", false);
      } else {
        this.logout();
      }
    },

    isEquals() {
      return JSON.stringify(this.form) === JSON.stringify(this.deepClone);
    },

    createdPerfil() {
      const snackBar = {
        show: true,
        message: "user.created",
        color: "success"
      };
      this.$store.dispatch("showMessage", snackBar);

      this.$emit("update:dialog", false);
    }
  },
  apollo: {
    teamItems: {
      query: TeamService.load,
      update(data) {
        return data.teams;
      }
    }
  },
  created() {
    // init
    this.form = this.userData;
    this.deepClone = JSON.parse(JSON.stringify(this.form));
  }
};
