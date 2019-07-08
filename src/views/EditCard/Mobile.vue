<template>
  <div class="m-edit-card" v-loading="onRequest">
    <van-cell title="审核状态" :value="pageData.state | examineStatus" v-if="pageData"/>
    <van-cell title="商户号" :value="formData.merchantId"></van-cell>
    <van-cell title="结算户名" :value="formData.payeeName"></van-cell>
    <van-cell title="结算人身份证" :value="formData.payeeId"></van-cell>
    <van-cell title="账户类型" value="对私"></van-cell>

    <van-cell title="银行卡正面照片" :border="false"/>
    <div class="card-panel">
      <FImage
              :is-mobile="true"
              :data="{}"
              @click.native="viewImage"
              v-if="!examine"
              v-model="formData.payeeIdImgPath"
      />
      <img class="payee-img" v-else :src="formData.payeeIdImgPath | img_cdn" alt="">
    </div>
    <van-cell title="结算账户">
      <input type="text" placeholder="请输入结算账号" v-model="formData.payeeBankAccount" v-if="!examine"/>
      <span v-else>{{formData.payeeBankAccount}}</span>
    </van-cell>
    <van-cell title="开户银行">
      <FLinkPicker
              v-if="!examine"
              :is-mobile="true"
              :data="bankPicker"
              v-model="formData.payeeBankCode"
      />
      <span>{{pageData&&pageData.payeeBankCodeName}}</span>
    </van-cell>
    <van-cell title="开户地址">
      <FLinkPicker
              :is-mobile="true"
              v-if="!examine"
              :data="addressPicker"
              v-model="formData.payeeBankProvinceCityId"
      />
      <span v-else>{{pageData&&pageData.payeeBankProvinceCityIdName}}</span>
    </van-cell>
    <van-cell
            title="开户支行"
            @click="callBranchPicker"
            :value="!examine ? branchName : (pageData&&pageData.payeeBankBranchCodeName)"
    />
    <van-cell title="审核备注" v-if="examine">
      <textarea type="text" v-model="editResult"/>
    </van-cell>

    <footer class="fixed-foot">
      <el-button type="primary" @click="submit">确定</el-button>
      <el-button type="primary" @click="confirm" v-if="examine">确定</el-button>
      <el-button @click="reject" v-if="examine">拒绝</el-button>
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
      border: 0;
    }

    .payee-img {
      width: 300px;
      height: 225px;
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
        padding: 0;
        line-height: 44px;
      }
    }
  }
</style>
