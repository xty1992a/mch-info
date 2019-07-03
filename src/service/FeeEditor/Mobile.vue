<template>
  <van-popup class="m-fee-editor" v-model="show" position="right" @closed="close" style="height: 100%;width: 100%;">
    <div style="height: 300px;background-color: #fff;">
      <van-navbar title="修改费率" left-text="返回" right-text="确定" @click-left="onCancel" @click-right="confirm"/>
      <section>
        <h3 class="title">
          <span>商户号</span>
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
              <van-cell title="微信" :value="currentItem?currentItem.text:''"/>
              <van-cell title="支付宝" :value="currentItem?currentItem.text:''"/>
              <van-cell title="修改费率" is-link :value="currentItem?currentItem.text:''" @click="pickItem"/>
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
              <van-cell title="1000元以内" :value="pageData?pageData.payRate.within:''"/>
              <van-cell title="1000元以上" value="参考闪付"/>
              <van-cell title="修改费率" value="不支持修改"/>
            </div>
          </li>
          <li class="item" :class="pageData && pageData.payRate.debitCard?'':'disabled'">
            <div class="item-head">
              <p>
                <svg-icon icon="up"/>
                <span>闪付</span>
              </p>
            </div>
            <div class="empty">当前通道不支持</div>
            <div class="item-body">
              <van-cell title="借记卡">
                <p>{{pageData?pageData.payRate.debitCard:""}}</p>
                <p style="color:#999;font-size: 12px;">20元封顶</p>
              </van-cell>
              <van-cell title="贷记卡" :value="pageData?pageData.payRate.creditCard:''"/>
              <van-cell title="修改费率" value="不支持修改"/>
            </div>
          </li>
        </ul>
      </section>
    </div>
  </van-popup>
</template>

<script>
  import { Popup, NavBar, Cell } from "vant";
  import Common from "./Common";

  export default {
    name: "MFeeEditor",
    components: { VanPopup: Popup, VanNavbar: NavBar, VanCell: Cell },
    mixins: [Common],
    data() {
      return {
        show: false,
      };
    },
    methods: {
      async pickItem() {
        const result = await this.$services.pickItem({
          value: this.rate,
          options: this.options.map(it => ({ ...it, label: it.text }))
        });
        if (!result.success) return;
        this.rate = result.value;
      },
    },
  };
</script>

<style lang="less" rel="stylesheet/less">
  @import "../../styles/variable";

  .m-fee-editor {
    font-size: 15px;

    .van-nav-bar {
      box-shadow: 2px 0 8px rgba(0, 0, 0, 0.1);
    }

    section {
      overflow: auto;
      position: absolute;
      bottom: 0;
      right: 0;
      top: 50px;
      left: 0;
    }

    .title {
      padding: 20px 10px 10px;
    }

    .list {
      padding: 10px;

      .item {
        color: #333;
        border: 1px solid #e5e5e5;
        margin-bottom: 15px;

        &.disabled {
          position: relative;

          &:after {
            content: '';
            position: absolute;
            bottom: 0;
            right: 0;
            top: 0;
            left: 0;
            background-color: rgba(230, 230, 230, .5);
          }

          .item-body {
            display: none;
          }

          .empty {
            height: 150px;
            padding-top: 50px;
            font-size: 18px;
            display: block;
          }
        }

        .item-head {
          background-color: #f7f7f7;
          padding: 10px;
          border-bottom: 1px solid #e5e5e5;
        }

        .item-body {

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
        }

        .empty {
          display: none;
        }
      }
    }
  }

</style>
