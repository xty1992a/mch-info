import * as API from "@/api";
import { mapState } from "vuex";
import BranchBankCode from "@/mixins/BranchBankCode";
import OCRObserver from "@/mixins/OCRObserver";
import PreviewImage from "@/mixins/PreviewImage";

export default {
  data() {
    return {
      onRequest: true,
      formData: {
        checkPaymentId: "",
        merchantId: "",
        payeeName: "",
        payeeId: "",
        payeeBankAccount: "",
        payeeBankProvinceCityId: "",
        payeeBankCode: "",
        payeeBankBranchCode: "",
        payeeIdImgPath: ""
      },

      pageData: null,

      payeeCheckStatus: "",
      editResult: "",

      payeeCheckOptions: [
        { text: "待审核", value: "1" },
        { text: "通过", value: "2" },
        { text: "拒绝", value: "3" },
        { text: "审核中", value: "4" }
      ],

      bankPicker: {
        filedName: "payeeBankCode",
        request: API.getLeaveOptions("/api/basic/getBank"),
        name: "开户银行",
        selectLevel: 1
      },
      addressPicker: {
        filedName: "payeeArea",
        request: API.getLeaveOptions("/api/basic/getArea"),
        selectLevel: 2,
        name: "开户地址"
      }
    };
  },
  mixins: [BranchBankCode, OCRObserver, PreviewImage],
  async created() {
    if (!this.$route.query.checkPaymentId) {
      this.$message("缺少必要参数");
      this.$router.push({ name: "Home" });
      return;
    }
    const success = await this.getClearingInfo(
      this.$route.query.checkPaymentId
    );
    this.onRequest = false;
    if (success) {
      this.initObservers(
        "payeeBankProvinceCityId",
        "payeeBankCode",
        "payeeBankBranchCode"
      );
    }
  },
  filters: {
    examineStatus: v => ["未提交", "待审核", "通过", "拒绝"][v]
  },
  methods: {
    async getClearingInfo(id) {
      const result = await API.getClearingInfo(id);
      if (!result.success) return false;
      result.data.payeeBankProvinceCityId = result.data.payeeBankProvinceCityId
        .replace(/null/g, "")
        .replace(/^,$/, "");
      Object.keys(this.formData).forEach(key => {
        if (!result.data.hasOwnProperty(key)) return;
        this.formData[key] = result.data[key];
      });
      this.payeeCheckStatus = result.data.state + "" || "1";
      this.formData.checkPaymentId = this.$route.query.checkPaymentId;
      this.pageData = result.data;
      this.initPreview();
      this.$nextTick(() => {
        this.observerCard(
          "payeeIdImgPath",
          "payeeBankAccount",
          "payeeBankCode"
        );
      });
      return true;
    },

    async submit() {
      if (Object.keys(this.formData).some(k => !this.formData[k])) {
        this.$message({
          type: "waring",
          message: "请填写完整!"
        });
        return;
      }
      const result = await API.setClearingInfo(this.formData);
      if (result.success) {
        this.$message({
          type: "success",
          message: "保存成功!"
        });
        this.$router.push({ name: "Home" });
      }
    },

    async confirmCheck() {
      const result = await API.auditClearing({
        checkPaymentId: this.$route.query.checkPaymentId,
        editResult: this.editResult,
        state: +this.payeeCheckStatus
      });
      console.log(result);
      if (result.success) {
        this.$message({
          message: "操作成功!",
          type: "success"
        });
        await this.$utils.sleep(1500);
        this.$store.commit("LogList/SET_SHOULD_REFRESH", true);
        this.$router.push({ name: "Home" });
      }
    },

    initPreview() {
      if (!this.examine) return;
      console.log(this.formData.payeeIdImgPath);
      if (!this.formData.payeeIdImgPath) return;
      this.initImagePreview([this.formData.payeeIdImgPath]);
    }
  },
  computed: {
    ...mapState("App", ["isMobile"]),

    examine() {
      return +this.$route.query.examine === 1;
    }
  },
  watch: {
    // async "formData.payeeBankProvinceCityId"() {
    //   this.fetchBranchBank();
    // },
    // async "formData.payeeBankCode"() {
    //   this.fetchBranchBank();
    // },
    /*    async "formData.payeeIdImgPath"(now) {
          if (this.beforeRequest || !now) return;
          const result = await API.bankCardOcr(this.$utils.img_cdn(now));
          console.log(result);
          if (!result.success) return;
          const { bankCardNumber, bankCode } = result.data;
          this.formData.payeeBankAccount = bankCardNumber;
          this.formData.payeeBankCode = bankCode;
        }*/
  }
};
