import FDateRange from "../../components/FormItem/FDateRange";
import dayjs from "dayjs";

export default {
  components: { FDateRange },
  data() {
    return {
      checkOptions: [
        { label: "成功", value: "1" },
        { label: "失败", value: "0" }
      ],
      //  0未审核 1审核中 2审核通过 3拒绝 4弃用
      mchOptions: [
        { label: "未审核", value: 0 },
        { label: "审核中", value: 1 },
        { label: "审核通过", value: 2 },
        { label: "审核拒绝", value: 3 },
        { label: "弃用", value: 4 }
      ],
      payOptions: [
        { label: "T+1", value: "1" },
        { label: "T+2", value: "2" }
      ],

      minDate: dayjs().subtract(1, "year").toDate(),
      maxDate: dayjs().toDate(),

      formData: {
        businessAccount: "",
        businessName: "",
        agentAccount: "",
        storeName: "",
        auditStatus: [],
        startEndDate: "",
        updateStartEndDate: "",
        auditStartEndDate: "",
        payTimes: "",
        channel: ""
      }
    };
  },
  created() {
    this.syncForm();
  },
  methods: {
    resetFrom() {
      Object.keys(this.formData).forEach(key => {
        this.formData[key] = Array.isArray(this.formData[key]) ? [] : "";
      });
    },

    syncForm() {
        Object.keys(this.formData).forEach(key => {
          this.formData[key] = this.value[key]
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
};
