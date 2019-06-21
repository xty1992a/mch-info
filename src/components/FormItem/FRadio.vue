<template>
  <el-radio-group class="f-form-item" v-model="vValue" :name="data.title" v-bind="$attrs">
    <el-radio :label="item.value" v-for="item in data.options" :key="item.value">{{item.label}}</el-radio>
    <DescBtn :text="data.description"/>
  </el-radio-group>
</template>

<script>
  import Common from "./Common";

  export default {
    name: "FRadio",
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

  .f-date {
  }
</style>
