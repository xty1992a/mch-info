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
        <span>{{pageData && pageData.merchantId}}</span>
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
            <div class="cell">
              <div class="label">微信</div>
              <div>{{currentItem?currentItem.text:""}}</div>
            </div>
            <div class="cell">
              <div :span="10" class="label">支付宝</div>
              <div :span="14">{{currentItem?currentItem.text:""}}</div>
            </div>
            <el-select v-model="rate" size="small">
              <el-option :value="it.value" :label="it.text" v-for="it in options" :key="it.value"/>
            </el-select>
          </div>
        </li>
        <li class="item" :class="pageData && pageData.payRate.within?'':'disabled'">
          <div class="item-head">
            <p>
              <svg-icon icon="up"/>
              <span>银联二维码</span>
            </p>
          </div>
          <div class="empty">当前通道不支持</div>
          <div class="item-body">
            <div class="cell">
              <div class="label">1000元以内</div>
              <div>{{pageData&&pageData.payRate.within}}</div>
            </div>
            <div class="cell">
              <div class="label">1000元以上</div>
              <div>参考闪付</div>
            </div>
            <el-select disabled size="small" value=""/>
          </div>
        </li>
        <li class="item" :class="pageData && pageData.payRate.creditCard?'':'disabled'">
          <div class="item-head">
            <p>
              <svg-icon icon="up"/>
              <span>闪付</span>
            </p>
          </div>
          <div class="empty">当前通道不支持</div>
          <div class="item-body">
            <div class="cell">
              <div class="label">借记卡</div>
              <div>
                <p>{{pageData?pageData.payRate.creditCard:""}}</p>
                <p style="color:#999;font-size: 12px;">20元封顶</p>
              </div>
            </div>
            <div class="cell">
              <div class="label">贷记卡</div>
              <div>{{pageData?pageData.payRate.creditCard:""}}</div>
            </div>
            <el-select disabled size="small" value=""/>
          </div>
        </li>
      </ul>
    </section>
    <div slot="footer" class="fee-editor-foot">
      <el-button @click="onCancel">取 消</el-button>
      <el-button type="primary" @click="confirm">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
  import Common from "./Common";

  export default {
    name: "FeeEditor",
    mixins: [Common],
    components: {},
    data() {
      return {
        show: false,
      };
    },
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

        .empty {
          display: none;
        }

        &.disabled {
          position: relative;

          .empty {
            display: block;
            text-align: center;
            padding-top: 45px;
            font-size: 17px;
          }

          .item-body {
            display: none;
          }

          &:after {
            content: '';
            position: absolute;
            bottom: 0;
            right: 0;
            top: 0;
            left: 0;
            background-color: rgba(230, 230, 230, .5);
          }
        }

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
          padding: 10px 15px 15px;

          .cell {
            display: flex;
            justify-content: space-between;
            padding: 10px 0;
            text-align: right;
            height: 36px;
            margin-bottom: 10px;

            .label {
              text-align: left;
            }
          }

          .el-select {
            margin-top: -5px;

            input {
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
