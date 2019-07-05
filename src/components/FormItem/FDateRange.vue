<template>
  <div class="f-date-range f-form-item">
    <div class="pick-holder" :class="{forever}" v-if="isMobile">
      <span class="start-time time-display" @click="callTimePicker('start')">
        <span v-if="startTime">{{ startTime | fmt }}</span>
        <span class="placeholder" v-else>开始日期</span>
      </span>
      <span style="padding: 0 4px;">至</span>
      <el-switch v-model="isForever" v-if="forever"
                 active-text="永久有效"
                 inactive-text=""/>
      <span class="end-time time-display" :class="isForever?'disabled':''" @click="callTimePicker('end')">
        <span v-if="endTime">{{ endTime | fmt }}</span>
        <span class="placeholder" v-else>结束日期</span>
      </span>
    </div>
    <template v-else>
      <el-date-picker
              v-model="startTime"
              :picker-options="startOptions"
              placeholder="开始日期"
      />
      <span style="padding: 0 4px;">至</span>
      <el-date-picker
              :disabled="isForever"
              v-model="endTime"
              :picker-options="endOptions"
              placeholder="结束日期"
      />
      <el-switch v-model="isForever" v-if="forever"
                 active-text="永久有效"
                 inactive-text=""/>
    </template>
    <DescBtn :text="data.description"/>
  </div>
</template>
<script>
  import dayjs from "dayjs";
  import Common from "./Common";

  const fmt = d => (d ? dayjs(d).format("YYYY-MM-DD") : "");

  function getStartLimit(min, end, max) {
    return {
      minDate: min,
      maxDate: end ? dayjs(end).toDate() : max
    };
  }

  function getEndLimit(start, max) {
    return {
      minDate: start ? dayjs(start).toDate() : dayjs().toDate(),
      maxDate: max
    };
  }

  function getLimitDate(type, start, end, min, max) {
    return {
      start: getStartLimit(min, end, max),
      end: getEndLimit(start, max)
    }[type];
  }

  export default {
    name: "FDateRange",
    components: {},
    mixins: [Common],
    props: {
      value: {
        type: String,
        default: ","
      },
      min: {
        type: Date,
        default: () => dayjs().subtract(10, "year").toDate()
      },
      max: {
        type: Date,
        default: () => dayjs().add(10, "year").toDate()
      },
      forever: {
        type: Boolean,
      }
    },
    filters: {
      fmt
    },
    data() {
      return {
        isForever: false
      };
    },
    created() {
      this.isMobile && this.$services.datePick();
    },
    methods: {
      async callTimePicker(type) {
        const propName = `${type}Time`;
        const { minDate, maxDate } = getLimitDate(
          type,
          this.startTime,
          this.endTime,
          this.min,
          this.max
        );
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
      // isForever: {
      //   get() {
      //     return dayjs("9999-12-31").isSame(this.endTime, "date");
      //   },
      //   set(v) {
      //     if (v) {
      //       this.endDisabled = true;
      //       this.endTime = "9999-12-31";
      //     } else {
      //     }
      //   }
      // },
      startTime: {
        get() {
          if (!this.value) return "";
          const [s, e] = this.value.split(",");
          if (!s) return "";
          return dayjs(s).toDate();
        },
        set(v) {
          const [s, e] = this.value.split(",");
          this.$emit("input", `${fmt(v)},${e || ""}`);
        }
      },
      endTime: {
        get() {
          if (!this.value) return "";
          const [s, e] = this.value.split(",");
          if (!e) return "";
          return dayjs(e).toDate();
        },
        set(v) {
          const [s, e] = this.value.split(",");
          this.$emit("input", `${s || ""},${fmt(v)}`);
        }
      },

      startOptions() {
        return {
          disabledDate: date => {
            return (
              dayjs(date).isAfter(dayjs(this.endTime)) ||
              dayjs(date).isBefore(this.min)
            );
          }
        };
      },
      endOptions() {
        return {
          disabledDate: date => {
            return (
              dayjs(date).isBefore(dayjs(this.startTime)) ||
              dayjs(date).isBefore(this.min) ||
              dayjs(date).isAfter(this.max)
            );
          }
        };
      }
    },
    watch: {
      endTime: {
        handler(now) {
          if (dayjs("9999-12-31").isSame(now, "date")) {
            this.isForever = true;
          }
        }, immediate: true
      },
      isForever(now) {
        if (now) {
          this.endTime = "9999-12-31";
        }
        else {
          this.endTime = this.max;
        }
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

      &.forever {
        display: block;

        .time-display {
          display: block;
        }
      }

      &:after {
        z-index: -1;
      }

      .time-display {
        padding: 0 15px;
        border: 1px solid #dcdfe6;
        border-radius: 4px;
        color: #606266;
        max-width: 220px;
        flex-basis: 100px;
        flex-grow: 1;
        flex-shrink: 1;
        touch-action: none;
        white-space: nowrap;

        &.disabled {
          background-color: #efefef;
          color: #999;
        }
      }

      .placeholder {
        color: #ccc;
      }
    }
  }
</style>
