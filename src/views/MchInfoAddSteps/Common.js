import { mapState, mapGetters } from "vuex";

export default {
  data() {
    return {
      errorMessages: null
    };
  },
  methods: {
    initErrorMessage() {
      this.errorMessages = Object.keys(this.formData).reduce((p, key) => {
        p[key] = "";
        return p;
      }, {});
    },
    checkData(nullable) {
      console.log("checkData");
      const keys = Object.keys(this.formData);

      if (keys.every(k => !this.formData[k])) {
        const message = nullable ? "您没有输入任何值,无须保存!" : "请将表单填写完整!";
        this.$message(message);
        return null;
      }

      const messages = keys.reduce((prev, key) => {
        const child = this.$refs[key][0];
        const msg = child.validate(nullable);
        this.errorMessages[key] = msg;
        return msg ? [...prev, msg] : prev;
      }, []);
      if (messages.length) return null;
      return { ...this.formData };
    },
    goToPage(name) {
      const checkPaymentId = this.$route.query.checkPaymentId;
      if (checkPaymentId !== 0) {
        this.$router.push({
          name,
          query: {
            checkPaymentId
          }
        });
      }
    }
  },
  computed: {
    ...mapState("App", [
      "isMobile"
    ]),
    ...mapGetters('App', [
      "screenType",
    ]),
    ...mapGetters("MchInfo", [
        "firstFields",
        "secondFields",
        "thirdFields"
      ]
    ),
    ...mapState("MchInfo", [
        "firstForm",
        "secondForm",
        "thirdForm"
      ]
    ),
    labelPosition() {
      return this.screenType === "xs" ? "top" : "right";
    }
  }
};
