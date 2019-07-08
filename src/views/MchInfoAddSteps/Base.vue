<template>
  <div class="mchInfo-add-base mch-info-page">
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
      <router-link :to="{ name: 'MchInfoAddMain' }">
        <el-button> 上一步</el-button>
      </router-link>

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
  import OCRObserver from "@/mixins/OCRObserver";

  export default {
    name: "MchInfoAddBase",
    components: { ...comList },
    mixins: [Common, OCRObserver],
    data() {
      return {
        formData: null
      };
    },
    async created() {
      const success = await this.initPage();
      if (success) {
        this.formData = this.firstFieldKeys.reduce((p, key) => ({ ...p, [key]: this.mchInfo[key] }), {});
        this.initErrorMessage();
      }
      // 监视需要OCR的字段
      this.$nextTick(() => {
        this.observerIdBack("corporationIdImg1Path", "corporationName", "corporationId");
        this.observerIdFront("corporationIdImg2Path", "corporationIdExpiryDate");
      });
    },
    methods: {
      saveAndNext() {
        const data = this.checkData(false);
        if (!data) return;
        this.$store.commit("MchInfo/SYNC_MCH_INFO", data);
        this.goToPage("MchInfoAddClosing");
      }
    },
    computed: {
      ...mapGetters("MchInfo", [
        "firstFieldKeys",
        "firstFields"
      ]),
      formItems() {
        return this.firstFields.map(it => {
          if (it.filedType !== "link-picker") return { ...it };
          return { ...it, request: API.getLeaveOptions(it.sourceUrl) };
        });
      },
    },
  };
</script>

<style lang="less" rel="stylesheet/less">
  .mchInfo-add-base {
  }
</style>
