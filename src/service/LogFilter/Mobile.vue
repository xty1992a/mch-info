<template>
  <van-popup
    class="m-log-filter"
    v-model="show"
    position="right"
    @closed="close"
    style="height: 100%;width: 100%;"
  >
    <div style="height: 300px;background-color: #fff;">
      <van-navbar
        title="筛选"
        left-text="返回"
        right-text="确定"
        @click-left="onCancel"
        @click-right="onConfirm"
      />
      <section>
        <el-form v-model="formData" label-position="top">
          <el-form-item label="商家账号">
            <el-input
              v-model="formData.businessAccount"
              placeholder="请输入商家账号"
            />
          </el-form-item>
          <el-form-item label="商家名称">
            <el-input
              v-model="formData.businessName"
              placeholder="请输入商家名称"
            />
          </el-form-item>
          <el-form-item label="代理商名称">
            <el-input
              v-model="formData.dlsName"
              placeholder="请输入代理商名称"
            />
          </el-form-item>
          <el-form-item label="门店名称">
            <el-input
              v-model="formData.chainStoreName"
              placeholder="请输入门店名称"
            />
          </el-form-item>
          <el-form-item label="进件结果">
            <RadioBox :options="mchOptions" v-model="formData.mchStatus" />
          </el-form-item>
          <el-form-item label="审核结果">
            <RadioBox :options="checkOptions" v-model="formData.checkStatus" />
          </el-form-item>
          <el-form-item label="审核时间">
            <FDateRange
              :is-mobile="true"
              :data="{}"
              v-model="formData.requestTime"
            />
          </el-form-item>
          <el-form-item label="审核时间">
            <FDateRange
              :is-mobile="true"
              :data="{}"
              v-model="formData.mchTime"
            />
          </el-form-item>
          <el-form-item label="结算周期">
            <RadioBox :options="payOptions" v-model="formData.payTimes" />
          </el-form-item>

          <footer>
            <el-button @click="syncForm">重置</el-button>
            <el-button @click="onConfirm" type="primary">确定</el-button>
          </footer>
        </el-form>
      </section>
    </div>
  </van-popup>
</template>
<script>
import RadioBox from "../../components/RadioBox";
import { NavBar, Popup } from "vant";
import Common from "./Common";

export default {
  name: "MFeeEditor",
  mixins: [Common],
  components: {
    VanPopup: Popup,
    VanNavbar: NavBar,
    RadioBox
  },
  data() {
    return {
      show: false
    };
  },
  created() {}
};
</script>

<style lang="less" rel="stylesheet/less">
@import "../../styles/variable";

.m-log-filter {
  font-size: 15px;

  .van-nav-bar {
    box-shadow: 2px 0 8px rgba(0, 0, 0, 0.1);
  }

  section {
    position: absolute;
    bottom: 0;
    right: 0;
    left: 0;
    top: 47px;
    padding: 20px 15px;
    overflow: auto;

    .el-form-item {
      margin-bottom: 15px;
    }

    .el-form-item__label {
      color: #333;
      font-size: 16px;
      font-weight: 600;
    }

    .radio-box {
      margin-bottom: -10px;
    }

    .el-input {
      input {
        background-color: #f9f9f9;
      }
    }

    footer {
      padding-top: 15px;
      text-align: center;

      .el-button {
        width: 120px;
      }
    }
  }
}
</style>
