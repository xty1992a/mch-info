<template>
  <div class="f-link-picker f-form-item">
    <div class="pick-holder" v-if="isMobile" @click="callPicker">
      <el-input :value="displayVal" :placeholder="placeholder"/>
    </div>
    <el-cascader :props="props" v-model="vValue" v-if="!isMobile" :placeholder="placeholder"/>
    <DescBtn :text="data.description"/>
  </div>
</template>

<script>
  // import linkPick from "../../service/LinkPicker";
  import Common from "./Common";

  export default {
    name: "FLinkPicker",
    components: {},
    mixins: [Common],
    props: {},
    data() {
      return {
        props: {
          lazy: true,
          lazyLoad: async (node, resolve) => {
            let res = [];
            if (node.root) {
              res = await this.data.request({ level: "", value: "china" });
            }
            else {
              const { level, value } = node;
              res = await this.data.request({ level, value });
            }
            res.forEach(it => it.leaf = node.level === this.data.selectLevel - 1);
            resolve(res);
          }
        },
        pickedItems: []
      };
    },
    created() {
      this.isMobile && this.$services.linkPick();
    },
    methods: {
      async callPicker() {
        const options = {
          key: this.data.filedName + "_link_pick_",
          value: this.value,
          data: this.data
        };
        const result = await this.$services.linkPick(options);
        if (result.success) {
          this.$emit("input", result.value);
          this.pickedItems = result.data;
        }
      }
    },
    computed: {
      vValue: {
        get() {
          if (!this.value) return [];
          return this.value.split(",");
        },
        set(v) {
          this.$emit("input", v.join(","));
        }
      },
      displayVal() {
        return this.pickedItems.map(it => it.label).join("/");
      }
    }
  };
</script>

<style lang="less" rel="stylesheet/less">

  .f-link-picker {
    .pick-holder {
      display: inline-block;
    }
  }
</style>
