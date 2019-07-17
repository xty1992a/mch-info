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
      <el-col class="pay-cell pay-type" :span="10">
        <div
          class="pay-item"
          :class="map[it.text] === data.key ? 'active' : ''"
          v-for="it in data.payTypes"
          :key="it.text"
        >
          <svg-icon :icon="it.type" />
          <span>{{ it.text }}</span>
        </div>
      </el-col>
      <el-col class="pay-cell pay-set" :span="2" style="text-align: center;">
        <el-button
          class="btn-text"
          @click="toggle"
          :disabled="!data.merchantParamList.length"
          >配置
        </el-button>
      </el-col>
      <el-col class="pay-cell pay-switch" :span="2" style="text-align: center;">
        <el-switch
          v-model="data.isActive"
          :active-value="1"
          :inactive-value="0"
          @change="toggleActive"
        />
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
            <el-form
              inline
              label-width="180px"
              label-position="right"
              v-model="formData"
            >
              <el-form-item
                :prop="item.key"
                :label="item.name"
                v-for="item in data.merchantParamList"
                :key="item.key"
              >
                <template v-if="item.key !== 'refundCertificate'">
                  <el-input
                    placeholder="请输入"
                    v-model="formData[item.key]"
                  ></el-input>
                </template>
                <template v-else>
                  <FileBtn
                    v-model="formData[item.key]"
                    :text="!!formData[item.key] ? '已上传' : '点击上传'"
                  />
                </template>
              </el-form-item>
              <div class="pay-guide-block">
                <p class="pay-guide">
                  <span class="label">支付目录①</span>
                  <span>(选择http://)m.yunhuiyuan.cn/Pay</span>
                  <a href="http://sz1card1.udesk.cn/hc/articles/64015"
                    >配置说明</a
                  >
                </p>
                <p class="pay-guide">
                  <span class="label">支付目录②</span>
                  <span>(选择https://)m.yunhuiyuan.cn/Pay</span>
                  <a href="http://sz1card1.udesk.cn/hc/articles/64015"
                    >配置说明</a
                  >
                </p>
              </div>

              <div v-if="data.providerId === 5">
                <a :href="getLink">立即授权</a>
              </div>

              <div style="text-align: center;">
                <el-button size="small" @click="showList = []">取消</el-button>
                <el-button size="small" type="primary" @click="confirm"
                  >确认
                </el-button>
              </div>
            </el-form>
          </div>
        </el-collapse-item>
      </el-collapse>
    </div>
  </div>
</template>

<script>
import FileBtn from "@/components/FileBtn";
import { Collapse, CollapseItem } from "element-ui";

export default {
  name: "ChanelItem",
  props: {
    data: {
      type: Object
    },
    map: Object, // 检查payTypeItem是否激活的字典
    index: Number,
    total: Number
  },
  components: { ElCollapse: Collapse, ElCollapseItem: CollapseItem, FileBtn },
  data() {
    return {
      formData: {},
      showList: []
    };
  },
  created() {
    this.data.merchantParamList.forEach(item => {
      this.$set(this.formData, item.key, item.value);
    });
  },
  methods: {
    confirm() {
      this.$emit("confirm", { ...this.formData, id: this.data.paramId });
    },
    toggleActive(value) {
      const query = { id: this.data.paramId, isActive: value };
      console.log(value);
      this.$emit("toggle", query);
    },
    changeIndex(type) {
      this.$emit(type, this.index);
    },

    getLink() {
      let params = {},
        data = this.data;
      return (
        "https://openauth.alipay.com/oauth2/appToAppAuth.htm?app_id=" +
        data.aliAppid +
        "&redirect_uri=https%3A%2F%2Fmps.1card1.cn%2Fpay-param%2Falipayauth?businessId=" +
        params.businessId +
        "&chainStoreId=" +
        params.chainStoreId +
        "&agentId=" +
        params.agentId +
        "&userAccount=" +
        params.userAccount +
        "&timeStamp=" +
        params.timeStamp +
        "&signature=" +
        params.signature +
        "&channelId=" +
        data.channelId
      );
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
        margin: 5px 0;

        svg {
          font-size: 18px;
          filter: grayscale(100%);
        }

        &.active {
          svg {
            filter: none;
          }
        }
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
      border: 0;
      padding: 0;

      &:not(:disabled) {
        color: @activeC;
      }
    }
  }

  .chanel-hide {
    .chanel-set-block {
      background-color: #f2f4f6;
      padding: 20px;
    }
  }

  .el-form {
    .el-form-item {
      max-width: 50%;
      margin-right: 0;
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

  .pay-guide-block {
    margin-bottom: 10px;

    .pay-guide {
      overflow: hidden;
      line-height: 1.6;

      span {
        display: inline-block;
        vertical-align: middle;
      }

      .label {
        width: 180px;
        padding-right: 12px;
        text-align: right;
      }
    }
  }

  .drag-handler {
    box-shadow: 2px 0 8px rgba(0, 0, 0, 0.1);
  }
}
</style>
