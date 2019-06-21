<template>
  <div class="f-date-range f-form-item">
    <div class="pick-holder" v-if="isMobile">
      <span class="start-time time-display" @click="callTimePicker('start')">
        <span v-if="startTime">{{startTime | fmt}}</span>
      <span class="placeholder" v-else>开始日期</span>
      </span>
      <span style="padding: 0 4px;">至</span>
      <span class="end-time time-display" @click="callTimePicker('end')">
        <span v-if="endTime">{{endTime | fmt}}</span>
      <span class="placeholder" v-else>结束日期</span>
      </span>
    </div>
    <template v-else>
      <el-date-picker v-model="startTime" :picker-options="startOptions" placeholder="开始日期"/>
      <span style="padding: 0 4px;">至</span>
      <el-date-picker v-model="endTime" :picker-options="endOptions" placeholder="结束日期"/>
    </template>
    <DescBtn :text="data.description"/>
  </div>
</template>
<script>
  import dayjs from "dayjs";
  import Common from "./Common";

  const fmt = d => d ? dayjs(d).format("YYYY-MM-DD") : "";

  function getStartLimit(start, end) {
    return {
      minDate: dayjs().toDate(),
      maxDate: end ? dayjs(end).toDate() : dayjs().add(10, "year").toDate()
    };
  }

  function getEndLimit(start, end) {
    return {
      minDate: start ? dayjs(start).toDate() : dayjs().toDate(),
      maxDate: dayjs().add(10, "year").toDate()
    };
  }

  function getLimitDate(type, start, end) {
    return ({
      start: getStartLimit(start, end),
      end: getEndLimit(start, end)
    })[type];
  }

  export default {
    name: "FDateRange",
    components: {},
    mixins: [Common],
    props: {
      value: {
        type: String,
        default: "/"
      }
    },
    filters: {
      fmt
    },
    created() {
      this.isMobile && this.$services.datePick();
    },
    methods: {
      async callTimePicker(type) {
        const propName = `${type}Time`;
        const { minDate, maxDate } = getLimitDate(type, this.startTime, this.endTime);
        const result = await this.$services.datePick({
          value: this[propName],
          data: this.data,
          minDate,
          maxDate
        });
        if (result.success) {
          console.log(result.value, propName);
          this[propName] = result.value;
        }
      }
    },
    computed: {
      startTime: {
        get() {
          if (!this.value) return "";
          const [s, e] = this.value.split("/");
          if (!s) return "";
          return dayjs(s).toDate();
        },
        set(v) {
          const [s, e] = this.value.split("/");
          this.$emit("input", `${fmt(v)}/${(e || "")}`);
        }
      },
      endTime: {
        get() {
          if (!this.value) return "";
          const [s, e] = this.value.split("/");
          if (!e) return "";
          return dayjs(e).toDate();
        },
        set(v) {
          const [s, e] = this.value.split("/");
          this.$emit("input", `${(s || "")}/${fmt(v)}`);
        }
      },

      startOptions() {
        return {
          disabledDate: (date) => {
            return dayjs(date).isAfter(dayjs(this.endTime)) || dayjs(date).isBefore(dayjs().subtract(1, "day"));
          }
        };
      },
      endOptions() {
        return {
          disabledDate: (date) => {
            return dayjs(date).isBefore(dayjs(this.startTime)) || dayjs(date).isBefore(dayjs().subtract(1, "day"));
          }
        };
      }
    }
  };
</script>

<style lang="less" rel="stylesheet/less">

  .f-date-range {
    display: inline-block;
    width: 100%;

    .el-input {
      width: 140px;
    }

    .pick-holder {
      display: inline-flex;
      width: calc(100% - 30px);

      &:after {
        z-index: -1;
      }

      .time-display {
        padding: 0 15px;
        border: 1px solid #DCDFE6;
        border-radius: 4px;
        color: #606266;
        max-width: 220px;
        flex-basis: 100px;
        flex-grow: 1;
        flex-shrink: 1;
        touch-action: none;
        white-space: nowrap;
      }

      .placeholder {
        color: #ccc;
      }
    }
  }
</style>
