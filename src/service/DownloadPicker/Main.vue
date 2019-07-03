<template>
  <el-dialog
          title="选择下载条件"
          :visible.sync="show"
          width="500px"
          class="download-picker"
          @closed="close">
    <section class="fee-editor-body">
      <div class="cell">
        <span>选择时间</span>
        <FDateRange :min="minDate" :max="maxDate" :is-mobile="false" :data="{}" v-model="time"/>
      </div>
      <div class="cell">
        <span>选择渠道</span>
        <p @click="pickChannel">{{channelItem?channelItem.channelName:"请选择"}}</p>
      </div>
    </section>
    <div slot="footer" class="picker-foot">
      <el-button @click="onCancel">取 消</el-button>
      <el-button type="primary" @click="onConfirm">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
  import { FDateRange } from "@/components/FormItem";
  import Common from "./Common";

  export default {
    name: "DownloadPicker",
    mixins: [Common],
    components: { FDateRange },
    data() {
      return {};
    },
    created() {
    },
    methods: {},
    computed: {
      time: {
        get() {
          return [this.startTime, this.endTime].join(",");
        },
        set(v) {
          const [startTime, endTime] = v.split(",");
          this.startTime = startTime;
          this.endTime = endTime;
        }
      }
    },
  };
</script>

<style lang="less" rel="stylesheet/less">

  .download-picker {
    .f-date-range .el-input {
    }

    .cell {
      display: flex;
      align-items: center;
      margin-bottom: 10px;

      > span {
        width: 100px;
        flex-shrink: 0;
      }

      p {
        width: 140px;
        border: 1px solid #e5e5e5;
        border-radius: 4px;
        height: 40px;
        line-height: 40px;
        padding-left: 10px;
      }
    }
  }
</style>
