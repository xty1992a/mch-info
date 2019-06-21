<template>
  <van-popup class="date-picker" v-model="show" position="bottom" @closed="close">
    <van-picker
            show-toolbar
            value-key="label"
            :columns="options"
            :default-index="index"
            @cancel="onCancel"
            @confirm="onConfirm"
    />
  </van-popup>
</template>

<script>
  import { Popup, Picker } from "vant";

  export default {
    name: "LinkPicker",
    components: { VanPopup: Popup, VanPicker: Picker },
    data() {
      return {
        show: false
      };
    },
    created() {

    },
    methods: {
      onCancel() {
        this.resolve({ success: false, value: this.value });
        this.show = false;
      },
      onConfirm({ value }) {
        console.log(value);
        this.resolve({ success: true, value });
        this.show = false;
      },
      close() {
        this.$destroy(true);
      }
    },
    computed: {
      index() {
        if (!this.value) return 0;
        if (!this.options) return 0;
        return this.options.findIndex(it => it.value === this.value);
      }
    },
    beforeDestroy() {
      this.$el && this.$el.remove();
    }
  };
</script>

<style lang="less" rel="stylesheet/less">
  @import "../../styles/variable";

  .date-picker {
    font-size: 15px;
  }

</style>
