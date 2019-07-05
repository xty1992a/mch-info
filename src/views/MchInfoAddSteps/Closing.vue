<template>
  <div class="mchInfo-add-closing mch-info-page">
    <el-form
            :label-position="labelPosition"
            label-width="150px"
            v-if="formData"
    >
      <el-form-item
              :label="item.name+':'"
              :prop="item.filedName"
              :key="item.filedName"
              :error="errorMessages[item.filedName]"
              v-for="item in formItems"
      >
        <component
                forever
                :ref="item.filedName"
                :is="'f-' + item.filedType"
                :data="item"
                :is-mobile="screenType === 'xs'"
                v-model="formData[item.filedName]"
        />
      </el-form-item>
    </el-form>

    <footer class="main-foot">
      <el-button @click="goToPage('MchInfoAddBase')"> 上一步</el-button>

      <el-button class="foot-item" @click="cacheData">暂存</el-button>

      <el-button class="foot-item" @click="saveAndNext">下一步</el-button>
    </footer>
  </div>
</template>

<script>
  import { mapState, mapGetters } from "vuex";
  import * as comList from "../../components/FormItem";
  import * as API from "../../api";
  import Common from "./Common";

  export default {
    name: "MchInfoAddClosing",
    components: { ...comList },
    mixins: [Common],
    data() {
      return {
        formData: null,
        branchBankList: []
      };
    },
    async created() {
      this.beforeRequest = true;
      const success = await this.initPage();
      if (success) {
        this.formData = this.secondFieldKeys.reduce((p, key) => ({ ...p, [key]: this.mchInfo[key] }), {});
        this.initErrorMessage();
      }
      this.$nextTick(() => {
        this.beforeRequest = false;
      });
    },
    methods: {

      saveAndNext() {
        const data = this.checkData(false);
        if (!data) return;
        this.$store.commit("MchInfo/SYNC_MCH_INFO", data);
        this.goToPage("MchInfoAddRest");
      },

      async fetchBranchBank() {
        if (!this.formData.payeeArea) return;
        if (!this.formData.payeeBankCode) return;
        const [p, cityId] = this.formData.payeeArea.split(",");
        const bankCode = this.formData.payeeBankCode;
        const result = await API.getLeaveOptions("/api/basic/getBankBranch")({ bankCode, cityId });
        if (result.success) {
          this.branchBankList = result.data.map(it => ({ ...it, label: it.text }));
          this.formData.payeeBankBranchCode = "";
        }
      }

    },
    computed: {
      ...mapGetters("MchInfo", [
        "secondFieldKeys",
        "secondFields",
      ]),
      formItems() {
        return this.secondFields.map(it => {
          const options = it.filedName === "payeeBankBranchCode" ? this.branchBankList : it.options;
          if (it.filedType !== "link-picker") return { ...it, options };
          return { ...it, request: API.getLeaveOptions(it.sourceUrl) };
        });
      }
    },
    watch: {
      async "formData.payeeArea"() {
        this.fetchBranchBank();
      },
      async "formData.payeeBankCode"() {
        this.fetchBranchBank();
      },

      // 银行卡图片
      async "formData.bankCardImgPath"(now) {
        // 开户许可证不识别(对公收款),不进行OCR
        if (this.mchInfo.payeeType === 16) return;
        if (this.beforeRequest || !now) return;
        const result = await API.bankCardOcr(this.$utils.img_cdn(now));
        if (!result.success) return;
        const { bankCardNumber, bankCode } = result.data;
        this.formData.payeeBankAccount = bankCardNumber;
        this.formData.payeeBankCode = bankCode;
      },
      // 人像面,获取人名,身份证号
      async "formData.payeeIdImg1Path"(now) {
        if (this.beforeRequest || !now) return;
        const result = await API.idBackOcr(this.$utils.img_cdn(now));
        if (!result.success) return;
        const { idCardNumber, idCardName } = result.data;
        this.formData.payeeName = idCardName;
        this.formData.payeeId = idCardNumber;
      },
      // 国徽面,获取有效期
      async "formData.payeeIdImg2Path"(now) {
        if (this.beforeRequest || !now) return;
        const result = await API.idFrontOcr(this.$utils.img_cdn(now));
        if (!result.success) return;
        const { startTime, endTime } = result.data;
        this.formData.payeeIdExpiryDate = [startTime, endTime].join(",");
      },
    }
  };
</script>

<style lang="less" rel="stylesheet/less">
  .mchInfo-add-closing {
  }
</style>
