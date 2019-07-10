<template>
  <div class="mchInfo-add-rest mch-info-page" v-loading="onRequest">
    <el-form
      :label-position="labelPosition"
      label-width="150px"
      v-if="formData"
    >
      <el-form-item
        :label="item.name + ':'"
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
      <el-button @click="goToPage('MchInfoAddClosing')"> 上一步</el-button>

      <el-button class="foot-item" @click="cacheData(false)">暂存</el-button>

      <el-button class="foot-item" @click="saveAndConfirm">提交</el-button>
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
  name: "MchInfoAddRest",
  components: { ...comList },
  mixins: [Common, BranchBankCode, OCRObserver],
  data() {
    return {
      formData: null
    };
  },
  async created() {
    this.beforeRequest = true;
    const success = await this.initPage();
    if (success) {
      this.formData = this.thirdFieldKeys.reduce(
        (p, key) => ({ ...p, [key]: this.mchInfo[key] }),
        {}
      );
      this.initErrorMessage();
      // 监视agentPayeeArea,agentPayeeBankCode,为agentPayeeBankBranchCode获取支行选项
      this.initObservers(
        "agentPayeeArea",
        "agentPayeeBankCode",
        "agentPayeeBankBranchCode"
      );
    }
    // 监视需要OCR的字段
    this.$nextTick(() => {
      this.observerIdBack(
        "agentPayeeIdImg1Path",
        "agentPayeeName",
        "agentPayeeId"
      );
      this.observerIdFront("agentPayeeIdImg2Path", "agentPayeeIdExpiryDate");
    });
  },
  methods: {
    async saveAndConfirm() {
      const data = this.checkData(false);
      if (!data) return;
      this.$store.commit("MchInfo/SYNC_MCH_INFO", data);
      console.log({ ...this.mchInfo });
      this.onRequest = true;
      const result = await API.submitMchInfo({ ...this.mchInfo });
      this.onRequest = false;
      if (result.success) {
        this.$message({
          type: "success",
          message: "保存成功!"
        });
        await this.$utils.sleep(1500);
        this.$store.commit("LogList/SET_SHOULD_REFRESH", true);
        this.$router.push({ name: "Home" });
      }
    }
  },
  computed: {
    ...mapGetters("MchInfo", ["thirdFieldKeys", "thirdFields"]),
    formItems() {
      return this.thirdFields.map(it => {
        const options =
          it.filedName === "agentPayeeBankBranchCode"
            ? this.branchBankList
            : it.options;

        if (it.filedType !== "link-picker") return { ...it, options };
        return { ...it, request: API.getLeaveOptions(it.sourceUrl) };
      });
    }
  }
};
</script>

<style lang="less" rel="stylesheet/less">
.mchInfo-add-rest {
}
</style>
