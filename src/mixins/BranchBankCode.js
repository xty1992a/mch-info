/*
* 页面调用initObservers,监视地区和银行code,两者均有时,获取支行列表
*
* 注意,获取支行列表,还需要将支行列表赋给对应Field的options
* */

import * as API from "@/api";

export default {
  data() {
    return {
      branchBankList: []
    };
  },
  methods: {
    initObservers(areaKey, bankKey, branchKey) {
      this.branchObserverProps = {
        area: areaKey,
        bank: bankKey,
        branch: branchKey
      };
      this[`watcher_${areaKey}`] = this.observerFormDataProp(areaKey);
      this[`watcher_${bankKey}`] = this.observerFormDataProp(bankKey);
    },

    clearObservers() {
      if (!this.branchObserverProps) return;
      const { area, bank } = this.branchObserverProps;
      this[`watcher_${area}`]();
      this[`watcher_${bank}`]();
    },

    observerFormDataProp(key) {
      return this.$watch(`formData.${key}`, (now, old) => {
        this.fetchBranchBank();
      });
    },

    async fetchBranchBank() {
      const { area, bank, branch } = this.branchObserverProps;

      if (!this.formData[area]) return;
      if (!this.formData[bank]) return;
      const [p, cityId] = this.formData[area].split(",");
      const bankCode = this.formData[bank];
      const result = await API.getLeaveOptions("/api/basic/getBankBranch")({ bankCode, cityId });
      if (result.success) {
        this.branchBankList = result.data.map(it => ({ ...it, label: it.text }));
        // 如果新的列表里包含了现有的支行,直接返回
        if (this.branchBankList.findIndex(it => it.value === this.formData[branch]) !== -1) return;
        this.formData[branch] = "";
      }
    }
  },

  destroyed() {
    this.clearObservers();
  }
};
