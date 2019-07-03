<template>
  <div class="f-date f-form-item">
    <div class="pick-holder" v-if="isMobile" @click="callDatePicker">
      <el-input :value="value" :placeholder="placeholder"/>
    </div>
    <el-date-picker v-else type="date" format="yyyy-MM-dd" v-bind="$attrs" :name="data.title" v-model="vValue" :placeholder="placeholder"/>
    <DescBtn :text="data.description"/>
  </div>
</template>

<script>
  import Common from "./Common";
  import dayjs from "dayjs";

  export default {
    name: "FDate",
    components: {},
    mixins: [Common],
    props: {
      min: {
        type: Date,
        default: () => dayjs().subtract(10, "year").toDate()
      },
      max: {
        type: Date,
        default: () => dayjs().add(10, "year").toDate()
      }
    },
    created() {
      // 预先加载
      this.isMobile && this.$services.datePick();
    },
    methods: {
      async callDatePicker() {
        const result = await this.$services.datePick({
          value: dayjs(this.value).toDate(),
          data: this.data,
          minDate: this.min,
          maxDate: this.max,
          format: this.format
        });
        if (result.success) {
          this.$emit("input", result.value);
        }
      },
      format(d) {
        return d ? dayjs(d).format(this.data.dateFormat || "YYYY-MM-DD") : "";
      }
    },
    computed: {
      vValue: {
        get() {
          if (!this.value) return "";
          return dayjs(this.value);
        },
        set(v) {
          this.$emit("input", this.format(v));
        }
      }
    }
  };
</script>

<style lang="less" rel="stylesheet/less">

  .f-date {
    display: inline-block;

    .pick-holder {
      display: inline-block;
    }
  }
</style>
