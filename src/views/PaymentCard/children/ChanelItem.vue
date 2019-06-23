<template>
  <div class="chanel-item">
    <el-row
      class="chanel-panel"
      type="flex"
      align="middle"
      style="flex-wrap: wrap"
    >
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
        <span class="btn-text" @click="toggle">配置</span>
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
    <div class="chanel-hide" :class="showList.length ? 'opened' : 'closed'">
      <el-collapse v-model="showList">
        <el-collapse-item name="1">
          <div class="chanel-set-block">
            <el-form inline label-width="180px" label-position="right">
              <el-form-item label="公众号APPID">
                <el-input placeholder="请输入"></el-input>
              </el-form-item>
              <el-form-item label="微信支付商户号">
                <el-input placeholder="请输入微信支付商户号"></el-input>
              </el-form-item>
              <el-form-item label="微信商户支付密钥Key">
                <el-input placeholder="请输入微信商户支付密钥Key"></el-input>
              </el-form-item>
              <el-form-item label="公众号AppSecret">
                <el-input placeholder="请输入公众号AppSecret"></el-input>
              </el-form-item>
              <el-form-item label="微信退款证书">
                <el-button>上传</el-button>
              </el-form-item>
            </el-form>
            <div style="text-align: center;">
              <el-button>取消</el-button>
              <el-button type="primary">确认</el-button>
            </div>
          </div>
        </el-collapse-item>
      </el-collapse>
    </div>
  </div>
</template>

<script>
import { Collapse, CollapseItem } from "element-ui";

export default {
  name: "ChanelItem",
  props: {
    data: {
      type: Object
    },
    index: Number,
    total: Number
  },
  components: { ElCollapse: Collapse, ElCollapseItem: CollapseItem },
  data() {
    return {
      showList: []
    };
  },
  created() {},
  methods: {
    changeIndex(type) {
      this.$emit(type, this.index);
    },
    async toggle() {
      this.showList = this.showList.length ? [] : ["1"];
      await this.$utils.sleep(300);
      this.$emit("resize");
    }
  },
  computed: {}
};
</script>

<style lang="less" rel="stylesheet/less">
@import "../../../styles/variable";

.chanel-item {
  position: relative;
  &:not(:last-of-type) {
    border-bottom: 2px solid #f2f4f6;
  }

  &:last-of-type {
    margin-bottom: 1px;
  }
}

.chanel-panel {
  background-color: #fff;
  position: relative;
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
      margin-bottom: 10px;
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

.chanel-hide {
  .chanel-set-block {
    background-color: #f2f4f6;
    padding: 20px;
  }
}

.el-collapse {
  border: 0;

  .el-collapse-item {
    border: 0;
    overflow: hidden;

    [role="tab"] {
      border-bottom: 0;
      height: 0;
      overflow: hidden;
    }
  }

  .el-collapse-item__content {
    padding: 0;
  }
}

.drag-handler {
  box-shadow: 2px 0 8px rgba(0, 0, 0, 0.1);
}
</style>
