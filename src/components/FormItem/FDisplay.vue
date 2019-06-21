<template>
  <div class="f-form-item f-display">
    <span>展示型</span>
    <DescBtn :text="data.description"/>
  </div>
</template>

<script>
  import Common from "./Common";

  export default {
    name: "FDisplay",
    components: {},
    mixins: [Common],
    props: {},
    data() {
      return {};
    },
    created() {
    },
    methods: {},
    computed: {}
  };
</script>

<style lang="less" rel="stylesheet/less">

  .f-display {
  }
</style>
