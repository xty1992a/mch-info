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
  import { mapState, mapGetters } from "vuex";
  import * as comList from "../../components/FormItem";
  import * as API from "../../api";
  import Common from "./Common";

  export default {
    name: "MchInfoAddRest",
    components: { ...comList },
    mixins: [Common],
    data() {
      return {
        formData: null
      };
    },
    async created() {
      const success = await this.initPage();
      if (success) {
        this.formData = this.thirdFieldKeys.reduce((p, key) => ({ ...p, [key]: this.mchInfo[key] }), {});
        this.initErrorMessage();
      }
    },
    methods: {
      async saveAndConfirm() {
        const data = this.checkData(false);
        if (!data) return;
        this.$store.commit("MchInfo/SYNC_MCH_INFO", data);
        console.log({ ...this.mchInfo });
        const result = await API.submitMchInfo({ ...this.mchInfo });
        if (result.success) {
          this.$message("保存成功!");
          await this.$utils.sleep(1500);
          this.$router.push({ name: "Home" });
        }
      }
    },
    computed: {
      ...mapGetters("MchInfo", [
        "thirdFieldKeys",
        "thirdFields"
      ]),
      formItems() {
        return this.thirdFields.map(it => {
          if (it.filedType !== "link-picker") return { ...it };
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
