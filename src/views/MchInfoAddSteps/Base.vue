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
      this.beforeRequest = true;
      const success = await this.initPage();
      if (success) {
        this.formData = this.firstFieldKeys.reduce((p, key) => ({ ...p, [key]: this.mchInfo[key] }), {});
        this.initErrorMessage();
      }
      this.$nextTick(() => {
        // this.beforeRequest = false;
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
    watch: {
      /*      // 人像面,获取人名,身份证号
            async "formData.corporationIdImg1Path"(now) {
              if (this.beforeRequest || !now) return;
              const result = await API.idBackOcr(this.$utils.img_cdn(now));
              if (!result.success) return;
              const { idCardNumber, idCardName } = result.data;
              this.formData.corporationName = idCardName;
              this.formData.corporationId = idCardNumber;
            },
            // 国徽面,获取有效期
            async "formData.corporationIdImg2Path"(now) {
              if (this.beforeRequest || !now) return;
              const result = await API.idFrontOcr(this.$utils.img_cdn(now));
              if (!result.success) return;
              const { startTime, endTime } = result.data;
              this.formData.corporationIdExpiryDate = [startTime, endTime].join(",");
            },*/
    }
  };
</script>

<style lang="less" rel="stylesheet/less">
  .mchInfo-add-base {
  }
</style>
