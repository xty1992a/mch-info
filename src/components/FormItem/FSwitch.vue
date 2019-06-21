<template>
  <div class="f-form-item f-switch">
    <el-switch v-model="vValue" :active-value="activeValue" :inactive-value="inActiveValue"/>
    <DescBtn :text="data.description"/>
  </div>
</template>

<script>
  import Common from "./Common";

  export default {
    name: "FSwitch",
    components: {},
    mixins: [Common],
    props: {},
    data() {
      return {};
    },
    created() {
    },
    methods: {},
    computed: {
      activeValue() {
        if (!this.data.enumJson.length) return "1";
        const item = this.data.enumJson[0];
        if (!item) return "1";
        return item.value;
      },
      inActiveValue() {
        if (!this.data.enumJson.length) return "0";
        const item = this.data.enumJson[1];
        if (!item) return "0";
        return item.value;
      }
    }
  };
</script>

<style lang="less" rel="stylesheet/less">

  .f-switch {
    .el-switch {
      line-height: 40px;
      vertical-align: baseline;
    }
  }
</style>
