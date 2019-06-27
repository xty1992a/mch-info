<template>
  <div class="mchInfo-add-closing mch-info-page">
    <el-form
            :label-position="labelPosition"
            label-width="130px"
            v-if="formData"
    >
      <el-form-item
              :label="item.name"
              :prop="item.filedName"
              :key="item.filedName"
              :error="errorMessages[item.filedName]"
              v-for="item in formItems"
      >
        <component
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
      const success = await this.initPage();
      if (success) {
        this.formData = this.$utils.copy(this.secondForm);
        this.initErrorMessage();
      }
    },
    methods: {
      // async initPage() {
      //   const id = this.$route.query["checkPaymentId"];
      //   if (!id) {
      //     this.$message("缺少必要参数!");
      //     await this.$utils.sleep(1500);
      //     this.$router.push({ name: "Home" });
      //     return;
      //   }
      //   /*      "secondFields", "thirdFields",*/
      //   if (!this.secondForm || !this.secondFields.length) {
      //     // 获取表单项
      //     await this.$store.dispatch("MchInfo/getFields", id);
      //     // 获取可能暂存的表单项的值
      //     await this.$store.dispatch("MchInfo/getDefaultFormValue", id);
      //   }
      //   this.formData = this.$utils.copy(this.secondForm);
      //   this.initErrorMessage();
      // },

      // 将数据提交到后端暂存,不必校验
      async cacheData() {
        const data = this.checkData(true);
        if (!data) return;
        await this.$store.dispatch("MchInfo/cacheFormData", {
          key: "secondForm",
          data
        });
      },
      saveAndNext() {
        const data = this.checkData(false);
        if (!data) return;
        this.$store.commit("MchInfo/SET_SECOND_FORM", data);
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
        }
      }
    },
    computed: {
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
      }
    }
  };
</script>

<style lang="less" rel="stylesheet/less">
  .mchInfo-add-closing {
  }
</style>
