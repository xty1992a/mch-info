<template>
  <footer class="mch-info-add-foot">
    <router-link class="foot-item" :to="{name:prevPage}" :disabled="!prevPage">
      <el-button :disabled="!prevPage">上一步</el-button>
    </router-link>
    <el-button class="foot-item" :disabled="currentStep===0">暂存</el-button>

    <el-button class="foot-item" v-if="currentStep===0" @click="saveAndNext">下一步</el-button>

    <router-link class="foot-item" v-else :to="{name: nextPage}" :disabled="!nextPage">
      <el-button :disabled="!nextPage">下一步</el-button>
    </router-link>
  </footer>
</template>

<script>
  import { mapState, mapGetters } from "vuex";

  export default {
    name: "Foot",
    inject: [
      "saveAndNext"
    ],
    computed: {
      ...mapState("MchInfo", []),
      ...mapGetters("MchInfo", [
        "currentStep",
        "nextPage",
        "prevPage"
      ])
    },

  };
</script>

<style lang="less" rel="stylesheet/less">

  .mch-info-add-foot {
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: center;

    .foot-item {
      margin: 0 5px;
    }
  }
</style>
