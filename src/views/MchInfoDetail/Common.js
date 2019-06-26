import { mapState, mapGetters } from "vuex";
import Block from "./children/Block";

export default {
  components: {Block},
  data() {
  },
  computed: {
    ...mapGetters("App", [
      "screenType"
    ]),
    isMobile() {
      return this.screenType === "xs";
    },
  }
};
