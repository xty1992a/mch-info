export default {
  data() {
    return {
      formData: {
        cardImage: "",
        bankName: "",
        branchName: "",
        address: ""
      },

      bankList: [
        { label: "中国银行", value: "zgyh" },
        { label: "中国工商", value: "zggs" },
        { label: "中国农业", value: "zgny" },
        { label: "建设银行", value: "jsyh" }
      ],
      provinces: []
    };
  }
};
