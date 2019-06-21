<template>
  <el-dialog
          title="修改费率"
          :visible.sync="show"
          width="640px"
          class="fee-editor"
          @closed="close">
    <section class="fee-editor-body">
      <h3 class="title">
        <span>商户号: </span>
        <span>HD01234</span>
      </h3>
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
    </section>
    <div slot="footer" class="fee-editor-foot">
      <el-button @click="onCancel">取 消</el-button>
      <el-button type="primary" @click="onConfirm">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>

  export default {
    name: "FeeEditor",
    components: {},
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
        this.resolve({ success: true, value: "asdf" });
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

  .fee-editor {
    font-size: 15px;


    .title {
      font-weight: normal;
      margin-bottom: 25px;
    }

    .list {
      display: flex;
      justify-content: space-between;

      .item {
        width: 180px;
        border-radius: 8px;
        border: 1px solid #f0f2f5;

        .item-head {
          border-bottom: 1px solid #f0f2f5;
          height: 56px;
          background-color: #F0F2F5;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;

          .sub-text {
            color: #999;
            font-size: 12px;
            margin-top: 6px;
          }
        }

        .item-body {
          height: 140px;
          padding: 15px 0;

          .el-row {
            margin: 10px 0;
          }

          .label {
            padding-left: 10px;
          }


          .el-select {
            height: 32px;
            width: 84px;

            input {
              height: 32px;
            }
          }
        }
      }
    }

    .fee-editor-foot {
      text-align: center;
      padding-bottom: 20px;
    }
  }

</style>
