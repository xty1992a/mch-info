<template>
  <div class="link-check">
    <el-checkbox :indeterminate="value.length>0&&value.length<options.length" v-model="checked">{{label}}</el-checkbox>
    <el-checkbox-group :value="value" @input="v => $emit('input', v)" style="display: inline-block;">
      <el-checkbox :label="item.value" v-for="item in options" :key="item.value">{{item.label}}</el-checkbox>
    </el-checkbox-group>
  </div>
</template>

<script>
  export default {
    name: "LinkCheck",
    components: {},
    props: {
      label: String,
      options: {
        type: Array
      },
      value: Array
    },
    data() {
      return {};
    },
    created() {
    },
    methods: {},
    computed: {
      checked: {
        get() {
          return this.value.length === this.options.length;
        },
        set(v) {
          if (v) {
            this.$emit("input", this.options.map(it => it.value));
          }
          else {
            this.$emit("input", []);
          }
        }
      }
    }
  };
</script>

<style lang="less" rel="stylesheet/less">

  .link-check {
  }
</style>
