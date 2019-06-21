<template>
  <div class="f-form-item f-text">
    <el-input v-bind="$attrs" :name="data.title" v-model="vValue" :placeholder="placeholder"/>
    <DescBtn :text="data.description"/>
  </div>
</template>

<script>
  import Common from "./Common";

  export default {
    name: "FText",
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

  .f-text {
  }
</style>
