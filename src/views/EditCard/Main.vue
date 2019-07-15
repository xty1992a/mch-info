<template>
  <Container title="结算信息修改申请" class="edit-card" v-loading="onRequest">
    <section class="content">
      <Panel
        label="审核状态"
        :value="pageData.state | examineStatus"
        v-if="pageData"
      ></Panel>
      <Panel label="商户号" :value="formData.merchantId"></Panel>
      <Panel label="结算户名" :value="formData.payeeName"></Panel>
      <Panel label="结算人身份证" :value="formData.payeeId"></Panel>
      <Panel label="账户类型" value="对私"></Panel>
      <Panel>
        <div class="slot-label" style="padding-top: 5px;" slot="label">
          银行卡正面照片
        </div>
        <FImage
          v-if="!examine"
          :data="{}"
          v-model="formData.payeeIdImgPath"
          @click.native="viewImage"
        />
        <AspectRatio
          :width="133.3"
          style="background-color: #f7f7f7;width: 300px;"
          v-else
        >
          <img :src="formData.payeeIdImgPath | img_cdn" />
        </AspectRatio>
      </Panel>
      <Panel>
        <div class="slot-label" slot="label">结算账号</div>
        <template v-if="!examine">
          <el-input
            placeholder="试试上传照片自动识别！"
            v-model="formData.payeeBankAccount"
          />
        </template>
        <span v-else>{{ formData.payeeBankAccount }}</span>
      </Panel>
      <Panel>
        <div class="slot-label" slot="label">开户地区</div>
        <FLinkPicker
          v-if="!examine"
          :is-mobile="false"
          :data="addressPicker"
          v-model="formData.payeeBankProvinceCityId"
        />
        <span v-else>{{
          pageData && pageData.payeeBankProvinceCityIdName
        }}</span>
      </Panel>
      <Panel>
        <div class="slot-label" slot="label">开户银行</div>

        <div style="width: 100%;" v-if="!examine">
          <FLinkPicker
            :is-mobile="false"
            :data="bankPicker"
            v-model="formData.payeeBankCode"
          />
        </div>
        <span v-else>{{ pageData && pageData.payeeBankCodeName }}</span>
      </Panel>

      <Panel>
        <div class="slot-label" slot="label">开户支行</div>
        <el-select
          clearable
          v-model="formData.payeeBankBranchCode"
          placeholder="选择支行"
          v-if="!examine"
        >
          <el-option
            v-for="item in branchBankList"
            :value="item.value"
            :key="item.value"
            :label="item.text"
          />
        </el-select>
        <span v-else style="display:inline-block;padding-top: 7px;">{{
          pageData && pageData.payeeBankBranchCodeName
        }}</span>
      </Panel>
      <Panel v-if="examine">
        <div class="slot-label" slot="label">审核备注</div>
        <el-input
          type="textarea"
          placeholder="输入审核备注"
          v-model="editResult"
          style="max-width: 400px"
        />
      </Panel>

      <Panel v-if="examine">
        <div class="slot-label" slot="label">审核状态</div>
        <el-select v-model="formData.payeeCheckStatus" placeholder="选择状态">
          <el-option
            v-for="item in payeeCheckOptions"
            :value="item.value"
            :key="item.value"
            :label="item.text"
          />
        </el-select>
      </Panel>
    </section>
    <footer class="footer" slot="foot">
      <el-button type="primary" @click="submit" v-if="!examine">确定</el-button>
      <el-button type="primary" @click="confirm" v-if="examine">确定</el-button>
      <el-button @click="reject" v-if="examine">拒绝</el-button>
    </footer>
  </Container>
</template>

<script>
import AspectRatio from "@/components/AspectRatio";
import Container from "@/components/Container";
import { FImage, FLinkPicker } from "../../components/FormItem";
import Panel from "./children/panel";
import BankPicker from "./children/BankPicker";
import Common from "./Common";
import { Image } from "element-ui";

export default {
  name: "EditCard",
  mixins: [Common],
  components: {
    Panel,
    FImage,
    FLinkPicker,
    BankPicker,
    Container,
    AspectRatio,
    ElImage: Image
  },
  data() {
    return {
      showBank: true
    };
  },
  created() {},
  methods: {},
  computed: {
    screenType() {
      return this.$store.getters["App/screenType"];
    }
  }
};
</script>

<style lang="less" rel="stylesheet/less">
.edit-card {
  .content {
    border: 1px solid #f0f2f5;
    border-radius: 8px;
    min-height: 500px;
    padding: 30px 0;
  }

  .panel {
    .label {
      padding-right: 40px;
    }

    .slot-label {
      padding-top: 7px;
    }

    .value {
      padding-left: 25px;
      flex: 1;
    }
  }

  .el-input {
    width: 200px;
  }

  .el-collapse-item__header {
    height: 0;
    overflow: hidden;
    border-bottom: 0;
  }

  .aspect-ratio {
    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
  }

  .footer {
    padding: 40px;
    text-align: center;

    .el-button {
      height: 42px;
      line-height: 42px;
      padding: 0;
      width: 240px;
    }
  }
}

&.mobile-app {
  .panel {
    flex-wrap: wrap;

    .label {
      text-align: left !important;
      width: 120px !important;
      padding: 0;
    }

    .value {
      padding-left: 0;
      text-align: right;
    }

    .el-input {
      width: 160px;
    }
  }
}
</style>
