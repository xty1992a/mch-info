<template>
  <div class="mchInfo-add-rest mch-info-page">
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
      <el-button @click="goToPage('MchInfoAddClosing')"> 上一步</el-button>

      <el-button class="foot-item" @click="cacheData">暂存</el-button>

      <el-button class="foot-item" @click="saveAndConfirm">保存</el-button>
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
      formData: null
    };
  },
  async created() {
    this.initPage();
  },
  methods: {
    async initPage() {
      const id = this.$route.query["checkPaymentId"];
      if (!id) {
        this.$message("缺少必要参数!");
        await this.$utils.sleep(1500);
        this.$router.push({ name: "Home" });
        return;
      }
      /*      "secondFields", "thirdFields",*/
      if (!this.thirdForm || !this.thirdFields.length) {
        // 获取表单项
        await this.$store.dispatch("MchInfo/getFields", id);
        // 获取可能暂存的表单项的值
        await this.$store.dispatch("MchInfo/getDefaultFormValue", id);
      }
      this.formData = this.$utils.copy(this.thirdForm);
      this.initErrorMessage();
    },

    // 将数据提交到后端暂存,不必校验
    async cacheData() {
      const data = this.checkData(true);
      if (!data) return;
      await this.$store.dispatch("MchInfo/cacheFormData", {
        key: "thirdForm",
        data
      });
    },
    saveAndConfirm() {
      const data = this.checkData(false);
      if (!data) return;
      console.log(data);
    }
  },
  computed: {
    formItems() {
      return this.thirdFields.map(it => {
        if (it.filedType !== "link-picker") return { ...it };
        return { ...it, request: API.getRegion };
      });
    }
  }
};
</script>

<style lang="less" rel="stylesheet/less">
.mchInfo-add-rest {
}
</style>
