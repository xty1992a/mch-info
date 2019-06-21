import FDateRange from "../../components/FormItem/FDateRange";

export default {
  components: {FDateRange},
  data() {
    return {
      checkOptions: [
        { label: "成功", value: "1" },
        { label: "失败", value: "0" }
      ],
      mchOptions: [
        { label: "审核通过", value: "1" },
        { label: "未审核", value: "2" },
        { label: "审核中", value: "3" },
        { label: "审核拒绝", value: "4" },
        { label: "弃用", value: "5" }
      ],
      payOptions: [
        { label: "T+1", value: "1" },
        { label: "T+2", value: "2" }
      ],

      formData: {
        businessAccount: "",
        businessName: "",
        dlsName: "",
        chainStoreName: "",
        mchStatus: "",
        checkStatus: "",
        requestTime: "",
        mchTime: "",
        payTimes: ""
      }
    }
  },
  created() {
    this.syncForm()
  },
  methods: {
    syncForm() {
      Object.keys(this.formData).forEach(key => {
        this.formData[key] = this.value[key] || "";
      });
    },
    onCancel() {
      this.resolve({ success: false, value: this.value });
      this.show = false;
    },
    onConfirm() {
      this.resolve({ success: true, value: { ...this.formData } });
      this.show = false;
    },
    close() {
      this.$destroy(true);
    }
  },
  computed: {},
  beforeDestroy() {
    this.$el && this.$el.remove();
  }
}
