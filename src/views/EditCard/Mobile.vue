<template>
  <div class="m-edit-card" v-loading="onRequest">
    <van-cell
      title="审核状态"
      :value="pageData.state | examineStatus"
      v-if="pageData"
    />
    <van-cell title="商户号" :value="formData.merchantId"></van-cell>
    <van-cell title="结算户名" :value="formData.payeeName"></van-cell>
    <van-cell title="结算人身份证" :value="formData.payeeId"></van-cell>
    <van-cell title="账户类型" value="对私"></van-cell>

    <van-cell title="银行卡正面照片" :border="false" />
    <div class="card-panel">
      <FImage
        :is-mobile="true"
        :data="{}"
        @click.native="viewImage"
        v-if="!examine"
        v-model="formData.payeeIdImgPath"
      />
      <AspectRatio
        v-else
        :width="133.3"
        style="background-color: #f7f7f7;width: 300px;"
      >
        <img :src="formData.payeeIdImgPath | img_cdn" alt="" />
      </AspectRatio>
    </div>
    <van-cell title="结算账户">
      <input
        type="text"
        placeholder="请输入结算账号"
        v-model="formData.payeeBankAccount"
        v-if="!examine"
      />
      <span v-else>{{ formData.payeeBankAccount }}</span>
    </van-cell>
    <van-cell title="开户地址">
      <FLinkPicker
        :is-mobile="true"
        v-if="!examine"
        :data="addressPicker"
        v-model="formData.payeeBankProvinceCityId"
      />
      <span v-else>{{ pageData && pageData.payeeBankProvinceCityIdName }}</span>
    </van-cell>
    <van-cell title="开户银行">
      <FLinkPicker
        v-if="!examine"
        :is-mobile="true"
        :data="bankPicker"
        v-model="formData.payeeBankCode"
      />
      <span>{{ pageData && pageData.payeeBankCodeName }}</span>
    </van-cell>
    <van-cell
      title="开户支行"
      @click="callBranchPicker"
      :value="
        !examine ? branchName : pageData && pageData.payeeBankBranchCodeName
      "
    />
    <van-cell
      title="审核状态"
      v-if="examine"
      is-link
      @click="pickState"
      :value="displayState"
    />
    <van-cell title="审核备注" v-if="examine"> </van-cell>
    <div class="text-area">
      <textarea type="text" v-model="editResult" />
    </div>

    <footer class="fixed-foot">
      <el-button size="small" type="primary" @click="submit" v-if="!examine"
        >确定</el-button
      >
      <el-button size="small" type="primary" @click="confirm" v-if="examine"
        >确定</el-button
      >
      <el-button size="small" @click="reject" v-if="examine">拒绝</el-button>
    </footer>
  </div>
</template>

<script>
import AspectRatio from "@/components/AspectRatio";
import { FImage, FLinkPicker } from "../../components/FormItem";
import Common from "./Common";
import { Cell } from "vant";

export default {
  name: "MEditCard",
  mixins: [Common],
  components: { FImage, VanCell: Cell, FLinkPicker, AspectRatio },
  methods: {
    async callBranchPicker() {
      const result = await this.$services.pickItem({
        value: this.formData.payeeBankBranchCode,
        options: this.branchBankList
      });
      if (!result.success) return;
      this.formData.payeeBankBranchCode = result.value;
    },

    async pickState() {
      const result = await this.$services.pickItem({
        value: this.formData.payeeCheckStatus,
        options: this.payeeCheckOptions.map(it => ({ ...it, label: it.text }))
      });
      if (!result.success) return;
      this.formData.payeeCheckStatus = result.value;
    }
  },
  computed: {
    branchName() {
      const { payeeBankBranchCode } = this.formData;
      const item = this.branchBankList.find(
        it => it.value === payeeBankBranchCode
      );
      if (!item) return "请选择银行";
      return item.label;
    },

    displayState() {
      const item = this.payeeCheckOptions.find(
        it => it.value === this.formData.payeeCheckStatus
      );
      if (!item) return "请选择状态";
      return item.text;
    }
  }
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

  .aspect-ratio {
    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
  }

  .text-area {
    padding: 10px;

    textarea {
      width: 100%;
      height: 50px;
    }
  }

  .fixed-foot {
    position: fixed;
    bottom: 0;
    right: 0;
    left: 0;
    background-color: #fff;
    box-shadow: 2px 0 8px rgba(0, 0, 0, 0.1);
    text-align: center;
    padding: 10px;

    .el-button {
      width: 90px;
    }
  }
}
</style>
