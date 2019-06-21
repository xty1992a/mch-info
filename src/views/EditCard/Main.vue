<template>
  <el-row class="edit-card" type="flex" justify="center">
    <el-col :md="20" :lg="18" :xl="14">
      <h3>结算信息修改申请</h3>
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

          <div
            @mouseenter="showBank = true"
            @mouseleave="showBank = false"
            style="width: 100%;"
          >
            <el-select v-model="formData.bankName" placeholder="开户银行">
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
      <footer class="footer">
        <el-button type="primary">确定</el-button>
      </footer>
    </el-col>
  </el-row>
</template>

<script>
import { FImage } from "../../components/FormItem";
import Panel from "./children/panel";
import BankPicker from "./children/BankPicker";
import Common from "./Common";

export default {
  name: "EditCard",
  mixins: [Common],
  components: { Panel, FImage, BankPicker },
  data() {
    return {
      showBank: true
    };
  },
  created() {},
  methods: {},
  computed: {}
};
</script>

<style lang="less" rel="stylesheet/less">
.edit-card {
  min-height: 100vh;
  background-color: #fff;

  h3 {
    padding: 18px;
  }

  .content {
    border: 1px solid #f0f2f5;
    border-radius: 8px;
    min-height: 500px;
    padding: 30px 0;

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
</style>
