import * as API from "@/api";
import { mapState } from "vuex";

export default {
  data() {
    return {
      formData: {
        checkPaymentId: "",
        merchantId: "",
        payeeName: "",
        payeeId: "",
        payeeBankAccount: "",
        payeeBankProvinceCityId: "",
        payeeBankCode: "",
        payeeBankBranchCode: "",
        payeeIdImgPath: "",
      },

      pageData: null,

      branchBankList: [],

      editResult: "",

      bankPicker: {
        filedName: "payeeBankCode",
        request: API.getLeaveOptions("/api/basic/getBank"),
        name: "开户银行",
        selectLevel: 1,
      },
      addressPicker: {
        filedName: "payeeArea",
        request: API.getLeaveOptions("/api/basic/getArea"),
        selectLevel: 2,
        name: "开户地址",
      }
    };
  },
  created() {
    if (!this.$route.query.checkPaymentId) {
      this.$message("缺少必要参数");
      this.$router.push({ name: "Home" });
      return;
    }
    this.getClearingInfo(this.$route.query.checkPaymentId);
  },
  methods: {
    async getClearingInfo(id) {
      this.beforeRequest = true;
      const result = await API.getClearingInfo(id);
      if (result.success) {
        result.data.payeeBankProvinceCityId = result.data.payeeBankProvinceCityId.replace(/null/g, "").replace(/^,$/, "");
        Object.keys(this.formData).forEach(key => {
          if (!result.data.hasOwnProperty(key)) return;
          this.formData[key] = result.data[key];
        });
        this.formData.checkPaymentId = this.$route.query.checkPaymentId;
        this.pageData = result.data;
        this.$nextTick(() => {
          this.beforeRequest = false;
        });
        return;
      }
      console.log(result);
    },
    async fetchBranchBank() {
      if (!this.formData.payeeBankProvinceCityId) return;
      if (!this.formData.payeeBankCode) return;
      const [p, cityId] = this.formData.payeeBankProvinceCityId.split(",");
      const bankCode = this.formData.payeeBankCode;
      const result = await API.getLeaveOptions("/api/basic/getBankBranch")({ bankCode, cityId });
      if (result.success) {
        this.branchBankList = result.data.map(it => ({ ...it, label: it.text }));
      }
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
        await this.$utils.sleep(1500);
        this.$router.push({ name: "Home" });
      }
    },

    confirm() {
      this.confirmCheck(1);
    },

    reject() {
      this.confirmCheck(3);
    },

    async confirmCheck(state) {
      const result = await API.auditClearing({
        checkPaymentId: this.$route.query.checkPaymentId,
        editResult: this.editResult,
        state
      });
      console.log(result);
      if (result.success) {
        this.$message({
          message: "操作成功!",
          type: "success"
        });
        await this.$utils.sleep(1500);
        this.$router.push({ name: "Home" });
      }
    },

    viewImage() {
      return;
      this.$services.viewImage({
        isMobile: this.isMobile,
        current: 0,
        images: [
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ39MfeOSXhJQDBHjGqOdstAvBV5sVMPtv_AJT4-DSKDuKA6Low",
          "https://p.ssl.qhimg.com/dmfd/400_300_/t0120b2f23b554b8402.jpg",
          "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1561643498814&di=da7abb4943413a2ee40a68cbb33a91af&imgtype=0&src=http%3A%2F%2Fpic37.nipic.com%2F20140113%2F8800276_184927469000_2.png"
        ]
      });
    }
  },
  computed: {
    ...mapState("App", [
      "isMobile"
    ]),

    // payeeArea: {
    //   get() {
    //     const { payeeBankProvinceId, payeeBankCityId } = this.formData;
    //     if (!payeeBankCityId || !payeeBankProvinceId) return "";
    //     return payeeBankProvinceId + "," + payeeBankCityId;
    //   },
    //   set(v) {
    //     if (!v) return;
    //     const [payeeBankProvinceId, payeeBankCityId] = v.split(",");
    //     this.formData = { ...this.formData, payeeBankProvinceId, payeeBankCityId };
    //   }
    // },
    examine() {
      return +this.$route.query.examine === 1;
    }
  },
  watch: {
    async "formData.payeeBankProvinceCityId"() {
      this.fetchBranchBank();
    },
    async "formData.payeeBankCode"() {
      this.fetchBranchBank();
    },
    async "formData.payeeIdImgPath"(now) {
      console.log(this.$utils.img_cdn(now), this.beforeRequest);
      if (this.beforeRequest) return;

      const result = await API.bankCardOcr(this.$utils.img_cdn(now));
      console.log(result);
      if (!result.success) return;
      const { bankCardNumber, bankName } = result.data;
      this.formData.payeeBankAccount = bankCardNumber;
    }
  }
};
