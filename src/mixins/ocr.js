import * as API from "@/api";

export default {
  methods: {},
  watch: {
    async "formData.payeeIdImgPath"(now) {
      console.log(this.$utils.img_cdn(now));
      const result = await API.bankCardOcr(this.$utils.img_cdn(now));
      console.log(result);
      if(!result.success) return
      const {bankCardNumber, bankName} = result.data

    }
  }
};
