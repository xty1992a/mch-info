import { mapGetters, mapState } from "vuex";
import "./common.less";

export default {
  data() {
    return {
      errorMessages: null
    };
  },
  methods: {
    async initPage() {
      const id = this.$route.query["checkPaymentId"];
      if (!id) {
        this.$message("缺少必要参数!");
        await this.$utils.sleep(1500);
        this.$router.push({ name: "Home" });
        return false;
      }
      this.$store.commit("MchInfo/SET_CHECK_PAYMENT_ID", this.$route.query.checkPaymentId);
      // 获取表单项
      await this.$store.dispatch("MchInfo/getFields", id);
      // 获取可能暂存的表单项的值
      await this.$store.dispatch("MchInfo/getDefaultFormValue", id);
      if (this.businessId && !this.publicInfo) {
        this.$store.dispatch(
          "User/fetchMchInfo",
          this.businessId
        );
      }
      return true;
    },

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
        const message = nullable
          ? "您没有输入任何值,无须保存!"
          : "请将表单填写完整!";
        this.$message(message);
        return null;
      }

      const messages = keys.reduce((prev, key) => {

        const child = this.$refs[key][0];
        console.log(this.$refs, key, child);
        const msg = child.validate(nullable);
        this.errorMessages[key] = msg;
        return msg ? [...prev, msg] : prev;
      }, []);
      if (messages.length) return null;
      return { ...this.formData };
    },
    goToPage(name) {
      const checkPaymentId = this.$route.query["checkPaymentId"] || 0;
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
    ...mapState("App", ["isMobile"]),
    ...mapState("User", ["publicInfo"]),
    ...mapState("MchInfo", ["firstForm", "secondForm", "thirdForm", "mchInfo"]),
    ...mapGetters("App", ["screenType"]),
    ...mapGetters("MchInfo", ["firstFields", "secondFields", "thirdFields"]),
    businessId() {
      if (!this.mchInfo) return "";
      return this.mchInfo.businessId;
    },
    labelPosition() {
      return this.screenType === "xs" ? "top" : "right";
    }
  }
};
