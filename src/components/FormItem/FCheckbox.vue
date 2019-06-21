<template>
  <div class="f-form-item f-checkbox">
    <el-checkbox-group v-model="vValue" :name="data.title" v-bind="$attrs">
      <el-checkbox :label="item.value" v-for="item in data.options" :key="item.value">{{item.label}}</el-checkbox>
      <DescBtn :text="data.description"/>
    </el-checkbox-group>
  </div>
</template>

<script>
  import Common from "./Common";

  export default {
    name: "FCheckbox",
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
      vValue: {
        get() {
          if (!this.value) return [];
          return this.value.split(",");
        },
        set(v) {
          this.$emit("input", v.join(","));
        }
      }
    }
  };
</script>

<style lang="less" rel="stylesheet/less">

  .f-checkbox {
  }
</style>
