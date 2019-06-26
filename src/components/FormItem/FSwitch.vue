<template>
  <div class="f-form-item f-switch">
    <el-switch
            v-model="vValue"
            :active-value="activeValue"
            :inactive-value="inActiveValue"
    />
    <DescBtn :text="data.description"/>
  </div>
</template>

<script>
  import Common from "./Common";

  export default {
    name: "FSwitch",
    mixins: [Common],
    computed: {
      activeValue() {
        if (!this.data.options.length) return "1";
        const item = this.data.options[0];
        if (!item) return "1";
        return item.value;
      },
      inActiveValue() {
        if (!this.data.options.length) return "0";
        const item = this.data.options[1];
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
