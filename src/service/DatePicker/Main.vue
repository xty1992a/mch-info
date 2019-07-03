<template>
  <van-popup class="date-picker" v-model="show" position="bottom" @closed="close">
    <van-datetime-picker
            v-model="currentDate"
            type="date"
            :min-date="minDate"
            :max-date="maxDate"
            @cancel="onCancel"
            @confirm="onConfirm"
    />
  </van-popup>
</template>

<script>
  import { Popup, DatetimePicker } from "vant";
  import dayjs from "dayjs";

  export default {
    name: "DatePicker",
    components: { VanPopup: Popup, VanDatetimePicker: DatetimePicker },
    data() {
      return {
        show: false,
        currentDate: new Date(),
        minDate: new Date(),
        maxDate: dayjs().add(10, "year").toDate()
      };
    },
    created() {
      if (this.value) {
        this.currentDate = new Date(this.value);
      }
    },
    methods: {
      onCancel() {
        this.resolve({ success: false, value: this.value });
        this.show = false;
      },
      onConfirm() {
        const date = this.currentDate;
        const value = this.format ? this.format(date) : date;
        this.resolve({ success: true, value, data: date });
        this.show = false;
      },
      close() {
        this.$destroy(true);
      }
    },
    computed: {},
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
