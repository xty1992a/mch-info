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
  import BranchBankCode from "@/mixins/BranchBankCode";
  import OCRObserver from "@/mixins/OCRObserver";

  export default {
    name: "MchInfoAddClosing",
    components: { ...comList },
    mixins: [Common, BranchBankCode, OCRObserver],
    data() {
      return {
        formData: null,
        branchBankList: []
      };
    },
    async created() {
      const success = await this.initPage();
      if (success) {
        this.formData = this.secondFieldKeys.reduce((p, key) => ({ ...p, [key]: this.mchInfo[key] }), {});
        this.initErrorMessage();
        // 监视payeeArea,payeeBankCode,为payeeBankBranchCode获取支行选项
        this.initObservers("payeeArea", "payeeBankCode", "payeeBankBranchCode");
      }
      // 监视需要OCR的字段
      this.$nextTick(() => {
        this.observerIdBack("payeeIdImg1Path", "payeeName", "payeeId");
        this.observerIdFront("payeeIdImg2Path", "payeeIdExpiryDate");
        this.observerCard("bankCardImgPath", "payeeBankAccount", "payeeBankCode");
      });
    },
    methods: {

      saveAndNext() {
        const data = this.checkData(false);
        if (!data) return;
        this.$store.commit("MchInfo/SYNC_MCH_INFO", data);
        this.goToPage("MchInfoAddRest");
      },

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
  };
</script>

<style lang="less" rel="stylesheet/less">
  .mchInfo-add-closing {
  }
</style>
