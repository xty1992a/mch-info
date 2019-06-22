<template>
  <el-row class="chanel-item" type="flex" align="middle">
    <el-col class="pay-cell pay-chanel" :span="6">
      <span class="el-icon-s-operation handler"></span>
      <span>{{ data.title }}</span>
      <span v-show="index === 0" class="first-label">优先通道</span>
    </el-col>
    <el-col class="pay-cell pay-type" :span="12">
      <div class="pay-item">
        <i class="el-icon-star-on"></i>
        <span>微信公众号支付</span>
      </div>
      <div class="pay-item">
        <i class="el-icon-picture"></i>
        <span>微信公众号支付</span>
      </div>
      <div class="pay-item">
        <i class="el-icon-s-finance"></i>
        <span>微信公众号支付</span>
      </div>
      <div class="pay-item">
        <i class="el-icon-s-open"></i>
        <span>微信公众号支付</span>
      </div>
    </el-col>
    <el-col class="pay-cell pay-set" :span="2">
      <span class="btn-text">配置</span>
    </el-col>
    <el-col class="pay-cell pay-index" :span="4">
      <span class="index-btn">
        <i
          :class="index === 0 ? 'disabled' : ''"
          class="el-icon-top"
          @click="changeIndex('up')"
        ></i>
        <i
          :class="index === total - 1 ? 'disabled' : ''"
          class="el-icon-bottom"
          @click="changeIndex('down')"
        ></i>
      </span>
      <span class="btn-text" v-show="index !== 0" @click="changeIndex('top')"
        >置顶</span
      >
    </el-col>
  </el-row>
</template>

<script>
export default {
  name: "ChanelItem",
  props: {
    data: {
      type: Object
    },
    index: Number,
    total: Number
  },
  components: {},
  data() {
    return {};
  },
  created() {},
  methods: {
    changeIndex(type) {
      this.$emit(type, this.index);
    }
  },
  computed: {}
};
</script>

<style lang="less" rel="stylesheet/less">
@import "../../../styles/variable";

.chanel-item {
  border-bottom: 1px solid #f2f4f6;
  background-color: #fff;
  min-height: 120px;

  .pay-chanel {
    padding-left: 30px;

    .handler {
      vertical-align: middle;
      font-size: 20px;
      margin-right: 20px;
    }

    .first-label {
      background-color: #23b523;
      line-height: 21px;
      padding: 2px 10px;
      border-radius: 4px;
      color: #fff;
    }
  }

  .pay-type {
    display: flex;
    flex-wrap: wrap;

    .pay-item {
      min-width: 150px;
    }
  }

  .pay-index {
    .index-btn {
      padding: 0 10px;

      i {
        margin: 0 5px;
        font-size: 20px;
        color: @activeC;
        cursor: pointer;

        &.disabled {
          cursor: not-allowed;
          color: #999;
        }
      }
    }
  }

  .btn-text {
    cursor: pointer;
    color: @activeC;
  }
}

.drag-handler {
  box-shadow: 2px 0 8px rgba(0, 0, 0, 0.1);
}
</style>
