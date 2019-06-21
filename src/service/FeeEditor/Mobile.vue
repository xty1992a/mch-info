<template>
  <van-popup class="m-fee-editor" v-model="show" position="right" @closed="close" style="height: 100%;width: 100%;">
    <div style="height: 300px;background-color: #fff;">
      <van-navbar title="修改费率" left-text="返回" right-text="确定" @click-left="onCancel" @click-right="onConfirm"/>
      <ul class="list">
        <li class="item">
          <div class="item-head">
            <p>
              <svg-icon icon="up"/>
              <span>扫码</span>
            </p>
          </div>
          <div class="item-body">
            <el-row type="flex" align="middle">
              <el-col :span="12" class="label">微信</el-col>
              <el-col :span="12">
                <el-select v-model="wechatFee">
                  <el-option value="1" label="0.6%"/>
                  <el-option value="2" label="0.8%"/>
                  <el-option value="3" label="1.0%"/>
                  <el-option value="4" label="1.2%"/>
                </el-select>
              </el-col>
            </el-row>
            <el-row type="flex" align="middle">
              <el-col :span="12" class="label">支付宝</el-col>
              <el-col :span="12">
                <el-select v-model="aliFee">
                  <el-option value="1" label="0.6%"/>
                  <el-option value="2" label="0.8%"/>
                  <el-option value="3" label="1.0%"/>
                  <el-option value="4" label="1.2%"/>
                </el-select>
              </el-col>
            </el-row>
          </div>
        </li>
        <li class="item">
          <div class="item-head">
            <p>
              <svg-icon icon="up"/>
              <span>银联二维码</span>
            </p>
            <p class="sub-text">不支持修改</p>
          </div>
          <div class="item-body">
            <el-row type="flex" align="middle">
              <el-col :span="12" class="label">1000元以内</el-col>
              <el-col :span="12">0.6%</el-col>
            </el-row>
            <el-row type="flex" align="middle">
              <el-col :span="12" class="label">1000元以上</el-col>
              <el-col :span="12">参考闪付</el-col>
            </el-row>
          </div>
        </li>
        <li class="item">
          <div class="item-head">
            <p>
              <svg-icon icon="up"/>
              <span>闪付</span>
            </p>
            <p class="sub-text">不支持修改</p>
          </div>
          <div class="item-body">
            <el-row type="flex" align="middle">
              <el-col :span="12" class="label">借记卡</el-col>
              <el-col :span="12">
                <p>0.6%</p>
                <p>20元封顶</p>
              </el-col>
            </el-row>
            <el-row type="flex" align="middle">
              <el-col :span="12" class="label">贷记卡</el-col>
              <el-col :span="12">参考闪付</el-col>
            </el-row>
          </div>
        </li>
      </ul>
    </div>
  </van-popup>
</template>

<script>
  import { Popup, NavBar } from "vant";

  export default {
    name: "MFeeEditor",
    components: { VanPopup: Popup, VanNavbar: NavBar },
    data() {
      return {
        show: false,
        wechatFee: "1",
        aliFee: "1"
      };
    },
    created() {

    },
    methods: {
      onCancel() {
        this.resolve({ success: false, value: this.value });
        this.show = false;
      },
      onConfirm() {
        this.resolve({ success: true, value: "" });
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

  .m-fee-editor {
    font-size: 15px;

    .van-nav-bar {
      box-shadow: 2px 0 8px rgba(0, 0, 0, 0.1);
    }

    .list {
      padding: 10px;

      .item {
        color: #333;
        border: 1px solid #e5e5e5;
        margin-bottom: 10px;

        .item-head {
          background-color: #f7f7f7;
          padding: 10px;
          border-bottom: 1px solid #e5e5e5;

          .sub-text {
            margin-top: 10px;
            font-size: 12px;
            color: #999;
          }
        }

        .item-body {
          padding: 10px;
        }

        .el-row {
          padding: 10px;

          .el-select {
            height: 32px;

            input {
              height: 32px;
            }
          }
        }
      }
    }
  }

</style>
