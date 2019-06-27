<template>
  <div class="f-picker f-form-item">
    <div class="pick-holder" @click="callPicker" v-if="isMobile">
      <el-input :value="displayValue" :placeholder="placeholder"/>
    </div>
    <template v-else>
      <el-select v-model="vValue" :name="data.title" v-bind="$attrs" :placeholder="placeholder" filterable>
        <el-option :value="item.value" :label="item.label" v-for="item in data.options" :key="item.value"/>
      </el-select>
    </template>
    <DescBtn :text="data.description"/>
  </div>
</template>

<script>
  import Common from "./Common";

  export default {
    name: "FPicker",
    components: {},
    mixins: [Common],
    props: {},
    data() {
      return {};
    },
    created() {
      this.isMobile && this.$services.pickItem();
    },
    methods: {
      async callPicker() {
        const result = await this.$services.pickItem({
          value: this.value,
          options: this.data.options
        });
        if (result.success) {
          console.log(result);
          this.$emit("input", result.value);
          console.log(this.displayValue);
        }
      }
    },
    computed: {
      displayValue() {
        if (!this.value) return "";
        if (!this.data.options) return "";
        const item = this.data.options.find(it => it.value === this.value);
        console.log(item, "display");
        if (!item) return "";
        return item.label;
      }
    }
  };
</script>

<style lang="less" rel="stylesheet/less">

  .f-picker {
    display: inline-block;

    .pick-holder {
      display: inline-block;
    }
  }
</style>
