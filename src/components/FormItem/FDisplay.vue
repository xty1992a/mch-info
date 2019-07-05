<template>
  <div class="f-form-item f-display">
    <span>{{value}}</span>
    <DescBtn :text="data.description"/>
  </div>
</template>

<script>
  import Common from "./Common";

  export default {
    name: "FDisplay",
    mixins: [Common],
  };
</script>

<style lang="less" rel="stylesheet/less">

  .f-display {
  }
</style>
