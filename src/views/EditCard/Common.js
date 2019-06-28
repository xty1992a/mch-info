import * as API from "@/api";
import { mapState } from "vuex";

export default {
  data() {
    return {
      formData: {
        payeeArea: "",
        payeeBankCode: "",
        payeeBankBranchCode: "",
        payeeIdImgPath: ""
      },

      branchBankList: [],

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
      const result = await API.getClearingInfo(id);
      this.formData = {
        "id": 3110017765666324,
        "payeeArea": "010000,010100",
        "merchantId": "3110017765666324",
        "payeeName": "张三",
        "payeeId": "320926195511175276",
        "payeeBankAccount": "对私",
        "payeeBankCode": "42",
        "payeeBankBranchCode": "313100090106",
        "payeeIdImgPath": "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1561643498814&di=da7abb4943413a2ee40a68cbb33a91af&imgtype=0&src=http%3A%2F%2Fpic37.nipic.com%2F20140113%2F8800276_184927469000_2.png",
        "state": "2",
        "editResult": "o]^p"
      };
      console.log(result);
    },
    async fetchBranchBank() {
      if (!this.formData.payeeArea) return;
      if (!this.formData.payeeBankCode) return;
      const [p, cityId] = this.formData.payeeArea.split(",");
      const bankCode = this.formData.payeeBankCode;
      const result = await API.getLeaveOptions("/api/basic/getBankBranch")({ bankCode, cityId });
      if (result.success) {
        this.branchBankList = result.data.map(it => ({ ...it, label: it.text }));
      }
    },

    viewImage() {
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
    ])
  },
  watch: {
    async "formData.payeeArea"() {
      this.fetchBranchBank();
    },
    async "formData.payeeBankCode"() {
      this.fetchBranchBank();
    }
  }
};
