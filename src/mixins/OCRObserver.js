/*
* 为页面提供三个监视方法,当监视的图片路径变化时,调用OCR接口,将结果赋给指定的字段
* */

import * as API from "@/api";

export default {
  methods: {
    /*
     监视银行卡
     propName, 监视的字段名
     accountKey, 需要赋值的银行卡号字段名
     codeKey, 需要赋值的银行Code字段名
    * */
    observerCard(propName, accountKey, codeKey) {
      const unwatch = this.$watch(`formData.${propName}`, async now => {
        if (!now) return;
        const result = await API.bankCardOcr(this.$utils.img_cdn(now));
        console.log(result);
        if (!result.success) return;
        const { bankCardNumber, bankCode } = result.data;
        this.formData[accountKey] = bankCardNumber;
        this.formData[codeKey] = bankCode;
      });
      this.unWatchList = this.unWatchList ? [...this.unWatchList, unwatch] : [unwatch];
    },
    /*
    监视身份证正面(国徽面)
     propName, 监视的字段名
     timeKey, 需要赋值的身份证有效期字段名
    * */
    observerIdFront(propName, timeKey) {
      const unwatch = this.$watch(`formData.${propName}`, async now => {
        if (!now) return;
        const result = await API.idFrontOcr(this.$utils.img_cdn(now));
        console.log(result);
        if (!result.success) return;
        const { startTime, endTime } = result.data;
        this.formData[timeKey] = [startTime, endTime].join(",");
      });
      this.unWatchList = this.unWatchList ? [...this.unWatchList, unwatch] : [unwatch];
    },
    /*
      监视身份证背面(人像面)
       propName, 监视的字段名
       nameKey, 需要赋值的人名字段名
       idKey, 需要赋值的身份证号字段名
      * */
    observerIdBack(propName, nameKey, idKey) {
      const unwatch = this.$watch(`formData.${propName}`, async now => {
        if (!now) return;
        const result = await API.idBackOcr(this.$utils.img_cdn(now));
        if (!result.success) return;
        const { idCardNumber, idCardName } = result.data;
        this.formData[nameKey] = idCardName;
        this.formData[idKey] = idCardNumber;
      });
      this.unWatchList = this.unWatchList ? [...this.unWatchList, unwatch] : [unwatch];
    }
  },
  destroyed() {
    console.log("unwatch ", this.unWatchList.length, " watchers ");
    this.unWatchList && this.unWatchList.forEach(unwatch => unwatch());
  }
};
