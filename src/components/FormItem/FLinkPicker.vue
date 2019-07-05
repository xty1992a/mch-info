<template>
  <div class="f-link-picker f-form-item">
    <div class="pick-holder" @click="callPicker">
      <el-input :value="displayVal" :placeholder="placeholder"/>
    </div>
    <!--    <el-cascader :props="props" v-model="vValue" v-if="!isMobile" :placeholder="placeholder"/>-->
    <DescBtn :text="data.description"/>
  </div>
</template>

<script>
  import Common from "./Common";

  export default {
    name: "FLinkPicker",
    components: {},
    mixins: [Common],
    props: {
      props: {
        type: Object,
        default: () => ({
          value: "value",
          label: "text"
        })
      }
    },
    data() {
      return {
        /*      props: {
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
              },*/
        pickedItems: []
      };
    },
    created() {
      this.isMobile && this.$services.linkPick();
    },
    mounted() {
      this.initPickedItems();
    },
    methods: {
      // 有值时,恢复值的文字状态
      async initPickedItems() {
        if (!this.value) return;
        // 有本地缓存,使用本地缓存
        const cachedItems = this.$storage.getItem(this.data.filedName + this.data.checkPaymentId + "_f_link_picked_items");
        if (cachedItems) {
          this.pickedItems = cachedItems;
          if (!this.value) {
            this.$emit("input", this.pickedItems.map(it => it.value).join(","));
          }
          return;
        }

        // 否则,依次请求值的[平级]数据集,并从中找到值的item
        const levels = `,${this.value}`.split(",").map((value, index) => ({ level: index, value }));
        const items = [];
        const options = {};
        console.log(levels);
        while (levels.length - 1) {
          const item = levels.shift();
          const result = await this.data.request(item);
          if (result.success) {
            options[item.value || "topLevel"] = result.data.map(it => ({
              ...it,
              value: it[this.props.value],
              label: it[this.props.label],
              level: levels[0].level
            }));
            const remoteItem = result.data.find(it => it.value === levels[0].value);
            remoteItem && items.push(remoteItem);
          }
        }
        if (this.value && items.length) {
          this.pickedItems = items.map(it => ({ ...it, label: it[this.props.label] }));
          this.$storage.setItem(this.data.filedName + this.data.checkPaymentId + "_f_link_picked_items", this.pickedItems);
          // 顺便把弹窗的数据也请求了
          this.$storage.setItem(this.data.filedName + "_link_pick_optionMap", options);
        }
      },

      async callPicker() {
        const options = {
          key: this.data.filedName + "_link_pick_",
          value: this.value || "",
          data: this.data,
          isMobile: this.isMobile,
          props: this.props
        };
        const result = await this.$services.linkPick(options);
        if (result.success) {
          this.$emit("input", result.value);
          this.pickedItems = result.data;
          this.$storage.setItem(this.data.filedName + this.data.checkPaymentId + "_f_link_picked_items", this.pickedItems);
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
    },
    watch: {
      value(now, old) {
        this.initPickedItems();
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
