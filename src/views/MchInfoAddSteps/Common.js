import { mapGetters, mapState } from "vuex";
import "./common.less";

export default {
  data() {
    return {
      errorMessages: null,
      onRequest: false
    };
  },
  methods: {
    // 初始化页面,获取表单项,暂存的数据,
    async initPage() {
      const id = this.$route.query["checkPaymentId"];
      if (!id) {
        this.$message("缺少必要参数!");
        await this.$utils.sleep(1500);
        this.$router.push({ name: "Home" });
        return false;
      }
      this.$store.commit("MchInfo/SET_CHECK_PAYMENT_ID", id);
      // 获取表单项
      await this.$store.dispatch("MchInfo/getFields", id);
      // 获取可能暂存的表单项的值
      await this.$store.dispatch("MchInfo/getMchInfo", id);
      if (this.businessId && !this.publicInfo) {
        this.$store.dispatch("User/fetchMchInfo", this.businessId);
      }
      return true;
    },

    // 初始化errorMessages,使其与formData有一样的字段
    initErrorMessage() {
      this.errorMessages = Object.keys(this.formData).reduce((p, key) => {
        p[key] = "";
        return p;
      }, {});
    },

    // 校验数据,通过返回完整formData,否则返回null
    checkData(nullable) {
      console.log("校验数据");
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
        const msg = child.validate(nullable);
        this.errorMessages[key] = msg;
        let unwatch = this.$watch(`formData.${key}`, () => {
          console.log("should reset error message");
          this.errorMessages[key] = "";
          unwatch();
        });
        return msg ? [...prev, msg] : prev;
      }, []);
      if (messages.length) {
        this.toastMessages(messages);
        return null;
      }
      return { ...this.formData };
    },

    // 依次弹出错误提示
    async toastMessages(messages) {
      while (messages.length) {
        this.$message({
          type: "waring",
          message: messages.shift()
        });
        await this.$utils.sleep(300);
      }
    },

    // 将页面数据同步到vuex
    async cacheData(isNext = false) {
      const data = this.checkData(!isNext);
      if (!data) return false;
      this.onRequest = true;
      const success = await this.$store.dispatch("MchInfo/cacheMchInfo", data);
      this.onRequest = false;
      if (success && !isNext) {
        this.$message({
          type: "success",
          message: "暂存成功!"
        });
      }
      return true;
    },

    // 使页面跳转带有统一的参数
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
    ...mapState("MchInfo", ["mchInfo"]),
    ...mapGetters("App", ["screenType"]),
    // 注意,该businessId与用户businessId可能不一致,这是进件信息中的businessId
    businessId() {
      if (!this.mchInfo) return "";
      return this.mchInfo.businessId;
    },
    labelPosition() {
      return this.screenType === "xs" ? "top" : "right";
    }
  }
};
