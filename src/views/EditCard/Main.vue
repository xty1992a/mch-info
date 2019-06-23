<template>
  <Container title="结算信息修改申请" class="edit-card">
    <section class="content">
      <Panel label="商户号" value="543534543543543"></Panel>
      <Panel label="结算户名" value="张三"></Panel>
      <Panel label="结算人身份证" value="320926195511175276"></Panel>
      <Panel label="账户类型" value="对私"></Panel>
      <Panel>
        <div class="slot-label" style="padding-top: 5px;" slot="label">
          银行卡正面照片
        </div>
        <FImage
          :data="{ description: 'asdfasdf' }"
          v-model="formData.cardImage"
        ></FImage>
      </Panel>
      <Panel>
        <div class="slot-label" slot="label">结算账号</div>
        <el-input placeholder="试试上传照片自动识别！" />
      </Panel>
      <Panel>
        <div class="slot-label" slot="label">开户银行</div>

        <div @mouseleave="showBank = false" style="width: 100%;">
          <el-select
            @mouseenter.native="showBank = true"
            v-model="formData.bankName"
            placeholder="开户银行"
          >
            <el-option
              value="1"
              label="中国工商银行"
              v-model="formData.bankName"
            ></el-option>
          </el-select>
          <BankPicker :show.sync="showBank" />
        </div>
      </Panel>
      <Panel>
        <div class="slot-label" slot="label">开户支行</div>
        <el-select v-model="formData.province" placeholder="省份">
          <el-option
            v-for="item in provinces"
            :value="item.value"
            :key="item.value"
            :label="item.label"
          />
        </el-select>
        <el-select v-model="formData.province" placeholder="城市">
          <el-option
            v-for="item in provinces"
            :value="item.value"
            :key="item.value"
            :label="item.label"
          />
        </el-select>
        <el-select v-model="formData.province" placeholder="支行">
          <el-option
            v-for="item in provinces"
            :value="item.value"
            :key="item.value"
            :label="item.label"
          />
        </el-select>
      </Panel>

      <Panel>
        <div class="slot-label" slot="label">结算绑定手机号</div>
        <el-input placeholder="输入手机号码！" />
      </Panel>
    </section>
    <footer class="footer" slot="foot">
      <el-button type="primary">确定</el-button>
    </footer>
  </Container>
</template>

<script>
import Container from "@/components/Container";
import { FImage } from "../../components/FormItem";
import Panel from "./children/panel";
import BankPicker from "./children/BankPicker";
import Common from "./Common";

export default {
  name: "EditCard",
  mixins: [Common],
  components: { Panel, FImage, BankPicker, Container },
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

  .footer {
    padding: 40px;
    text-align: center;

    .el-button {
      height: 42px;
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
