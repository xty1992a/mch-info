import * as API from "@/api";

export default {
  data() {
    return {
      rate: 0,
      pageData: null
    };
  },
  created() {
    this.getRateInfo();
  },
  methods: {
    async getRateInfo() {
      const result = await API.getRateInfo({ checkPaymentId: this.checkPaymentId });
      console.log(result);
      if (!result.success) return;
      this.pageData = result.data;
      this.rate = "0.003";
    },
    async confirm() {
      const result = await API.editRate({
        checkPaymentId: this.checkPaymentId,
        type: "nounionpay",
        rate: this.rate
      });
      if (!result.success) return;
      this.$message({
        type: "success",
        message: "修改成功!"
      });
      this.onConfirm();
    },
    onCancel() {
      this.resolve({ success: false, value: this.rate });
      this.show = false;
    },
    onConfirm() {
      this.resolve({ success: true, value: this.rate });
      this.show = false;
    },
    close() {
      this.$destroy(true);
    }
  },

  computed: {
    currentItem() {
      if (!this.rate) return null;
      return this.options.find(it => it.value === this.rate);
    }
  },
  beforeDestroy() {
    this.$el && this.$el.remove();
  },
};
