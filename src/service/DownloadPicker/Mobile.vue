<template>
  <van-popup class="download-picker"
             v-model="show"
             @closed="close">
    <header>选择下载条件</header>
    <div class="download-picker-container">
      <van-cell title="开始日期" class="date-cell" @click="callPicker('start')" :value="startTime" is-link/>
      <van-cell title="结束日期" class="date-cell" @click="callPicker('end')" :value="endTime" is-link/>
      <van-cell title="选择通道" :value="channelItem?channelItem.channelName:'请选择'" is-link @click="pickChannel"/>
    </div>
    <div class="picker-foot">
      <el-button size="small" @click="onCancel">取 消</el-button>
      <el-button size="small" type="primary" @click="onConfirm">确 定</el-button>
    </div>
  </van-popup>
</template>

<script>
  import { Popup, Cell } from "vant";
  import dayjs from "dayjs";
  import Common from './Common'

  export default {
    name: "MDownloadPicker",
    mixins: [Common],
    components: { VanPopup: Popup, VanCell: Cell },
    methods: {
      async callPicker(type) {
        const { startTime, endTime } = this;
        let minDate, maxDate;
        if (type === "start") {
          minDate = this.minDate;
          maxDate = endTime ? dayjs(endTime).toDate() : this.maxDate;
        }
        if (type === "end") {
          minDate = startTime ? dayjs(startTime).toDate() : this.minDate;
          maxDate = this.maxDate;
        }

        const result = await this.$services.datePick({
          value: dayjs(this.startTime).toDate(),
          data: this.data,
          format: d => dayjs(d).format("YYYY-MM-DD"),
          minDate,
          maxDate,
        });
        if (!result.success) return;
        this[`${type}Time`] = result.value;
      },
    },
  };
</script>

<style lang="less" rel="stylesheet/less">
  @import "../../styles/variable";

  .download-picker {
    width: 300px;
    font-size: 15px;

    header {
      background-color: #f7f7f7;
      padding: 10px;
      text-align: center;
    }

    .el-dialog__body {
      padding: 0;
    }

    .date-cell {
    }

    .picker-foot {
      padding: 10px;
      text-align: center;
    }
  }

</style>
