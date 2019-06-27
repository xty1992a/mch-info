<template>
  <div class="mchInfo-add-base mch-info-page">
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
      <router-link :to="{ name: 'MchInfoAddMain' }">
        <el-button> 上一步</el-button>
      </router-link>

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
    name: "MchInfoAddBase",
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
        this.formData = this.$utils.copy(this.firstForm);
        this.initErrorMessage();
      }
    },
    methods: {

      // 将数据提交到后端暂存,不必校验
      async cacheData() {
        const data = this.checkData(true);
        if (!data) return;
        console.log("");
        await this.$store.dispatch("MchInfo/cacheFormData", {
          key: "firstForm",
          data
        });
      },
      saveAndNext() {
        const data = this.checkData(false);
        if (!data) return;
        this.$store.commit("MchInfo/SET_FIRST_FORM", data);
        this.goToPage("MchInfoAddClosing");
      }
    },
    computed: {
      formItems() {
        return this.firstFields.map(it => {
          if (it.filedType !== "link-picker") return { ...it };
          return { ...it, request: API.getLeaveOptions(it.sourceUrl) };
        });
      }
    }
  };
</script>

<style lang="less" rel="stylesheet/less">
  .mchInfo-add-base {
  }
</style>
