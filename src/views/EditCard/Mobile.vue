<template>
  <div class="m-edit-card">
    <van-cell></van-cell>
    <van-cell title="商户号" value="543534543543543"></van-cell>
    <van-cell title="结算户名" value="张三"></van-cell>
    <van-cell title="结算人身份证" value="320926195511175276"></van-cell>
    <van-cell title="账户类型" value="对私"></van-cell>

    <van-cell title="银行卡正面照片" :border="false"/>
    <div class="card-panel">
      <FImage
              :is-mobile="true"
              :data="{ description: 'asdfasdf' }"
              @click.native="viewImage"
              v-model="formData.payeeIdImgPath"
      />
    </div>
    <van-cell title="结算账户">
      <input type="text" placeholder="请输入结算账号"/>
    </van-cell>
    <van-cell
            title="开户银行"
    >
      <FLinkPicker
              :is-mobile="true"
              :data="bankPicker"
              v-model="formData.payeeBankCode"
      />
    </van-cell>
    <van-cell title="开户地址">
      <FLinkPicker
              :is-mobile="true"
              :data="addressPicker"
              v-model="formData.payeeArea"
      />
    </van-cell>
    <van-cell
            title="开户支行"
            @click="callBranchPicker"
            :value="branchName"
    />
    <van-cell title="结算账号绑定手机号">
      <input type="text"/>
    </van-cell>

    <footer class="fixed-foot">
      <el-button type="primary">确定</el-button>
    </footer>
  </div>
</template>

<script>
  import { FImage, FLinkPicker } from "../../components/FormItem";
  import Common from "./Common";
  import * as API from "../../api";

  import { Cell } from "vant";

  export default {
    name: "MEditCard",
    mixins: [Common],
    components: { FImage, VanCell: Cell, FLinkPicker },
    data() {
      return {};
    },
    created() {
    },
    methods: {
      async callBranchPicker() {
        const result = await this.$services.pickItem({
          value: this.formData.payeeBankBranchCode,
          options: this.branchBankList
        });
        if (!result.success) return;
        this.formData.payeeBankBranchCode = result.value;
      },
    },
    computed: {
      branchName() {
        const { payeeBankBranchCode } = this.formData;
        const item = this.branchBankList.find(it => it.value === payeeBankBranchCode);
        if (!item) return "请选择银行";
        return item.label;
      }
    },

  };
</script>

<style lang="less" rel="stylesheet/less">
  .m-edit-card {
    background-color: #fff;
    min-height: 100vh;

    padding-bottom: 80px;

    .card-panel {
      padding: 0 10px 10px;
    }

    input {
      text-align: right;
    }

    .pick-holder {
      width: 100%;

      .el-input {
        width: 100%;
        margin-right: -15px;

        input {
          width: 100%;
          text-align: right;

          border: 0;
          height: 28px;
        }
      }
    }

    .fixed-foot {
      position: fixed;
      bottom: 0;
      right: 0;
      left: 0;
      background-color: #fff;
      box-shadow: 2px 0 8px rgba(0, 0, 0, 0.1);

      padding: 10px;

      .el-button {
        width: 100%;
        height: 44px;
        line-height: 44px;
      }
    }
  }
</style>
