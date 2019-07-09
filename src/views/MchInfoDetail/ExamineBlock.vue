<template>
  <div class="examine-block" :class="isMobile?'mobile':''">
    <Block title="审核操作" :is-mobile="isMobile" v-if="isExamine">
      <el-form label-width="120px">
        <template v-if="isMobile">
          <van-cell title="当前状态" :value="currentStatus"/>
          <template v-if="channelOptions.length">
            <van-cell is-link title="进件通道" @click="showChannel=!showChannel" :value="displayChannel" :arrow-direction="showChannel?'down':''"/>
            <RadioBox v-model="formData.channelIds" :options="channelOptions" v-show="showChannel" style="padding: 10px;"/>
          </template>
          <van-cell title="备注说明"></van-cell>
          <div class="textarea-panel">
            <el-input type="textarea" v-model="formData.auditResult"/>
          </div>
          <van-cell is-link title="进件结果"></van-cell>
        </template>
        <template v-else>
          <el-form-item label="当前状态">
            <span>{{currentStatus}}</span>
          </el-form-item>

          <el-form-item label="进件通道" v-if="channelOptions.length">
            <el-checkbox-group v-model="formData.channelIds">
              <el-checkbox :label="item.value" v-for="item in channelOptions" :key="item.value">{{item.label}}</el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          <el-form-item label="拒绝说明">
            <RejectMessages v-model="pickedMessages"/>
            <div class="textarea-panel">
              <el-input type="textarea" v-model="formData.auditResult"/>
            </div>
          </el-form-item>
        </template>
      </el-form>
    </Block>

    <footer class="page-foot">
      <el-button @click="$router.push({name:'Home'})">返回</el-button>
      <el-button v-if="isExamine" @click="reject">拒绝</el-button>
      <el-button v-if="isExamine" type="primary" @click="confirm">进件</el-button>
    </footer>
  </div>
</template>

<script>
  import * as API from "@/api";
  import { Cell } from "vant";
  import Common from "./Common";
  import RadioBox from "@/components/RadioBox";
  import RejectMessages from "./children/RejectMessages";

  const diff = (a, b) => a.find(it => !b.includes(it)) || b.find(it => !a.includes(it));

  export default {
    name: "ExamineBlock",
    mixins: [Common],
    components: { VanCell: Cell, RadioBox, RejectMessages },
    props: {
      isExamine: Boolean,
      data: Object,
    },
    data() {
      return {
        showChannel: true,
        pickedMessages: [],
        formData: {
          auditResult: "",
          channelIds: []
        },
      };
    },
    created() {
      this.formData.channelIds = [...this.data.selectChannelIds];
      this.formData.auditResult = this.data.audit[1].value;
    },
    methods: {
      async callPicker() {
        const result = await this.$services.pickItem({
          value: this.formData.auditStatus,
          options: this.channelOptions
        });
        console.log(result);
        this.formData.auditStatus = result.value;
      },

      checkForm() {
        const { mpsCheckPaymentId } = this.data;
        return {
          ...this.formData,
          checkPaymentId: mpsCheckPaymentId
        };
      },

      confirm() {
        const data = this.checkForm();
        if (!data) return;
        this.submitFrom({ ...data, auditStatus: 1 });
      },

      reject() {
        const data = this.checkForm();
        if (!data) return;
        this.submitFrom({ ...data, auditStatus: 3 });
      },

      async submitFrom(data) {
        if (!data) return;
        console.log(data);
        const result = await API.auditPayment(data);
        if (result.success) {
          this.$message(data.auditStatus === 3 ? "拒绝成功!" : "进件成功!");
          await this.$utils.sleep(1500);
          this.$store.commit("LogList/SET_SHOULD_REFRESH", true);
          this.$router.push({ name: "Home" });
        }
      }
    },
    computed: {
      displayChannel() {
        return "请选择";
      },
      currentStatus() {
        if (!this.data) return "";
        const { audit } = this.data;
        return audit[0].value;
      },
      channelList() {
        return (this.data.channelList || []).map(it => ({ ...it, label: it.channelName, value: it.id }));
      },
      channelOptions() {
        if (!this.data) return [];
        // selectedChannel决定已选能否再修改
        const { selectedChannel, selectChannelIds } = this.data;
        if (!this.data.selectedChannel) {
          return this.channelList;
        }
        else {
          return this.channelList.map(it => ({
            ...it,
            disabled: selectChannelIds.includes(it.value)
          }));
        }
      }
    },
    watch: {
      pickedMessages(now, old) {
        if (!Array.isArray(now) || !Array.isArray(old)) return;
        if (Math.abs(now.length - old.length) !== 1) return;
        let changeOne = diff(now, old);
        if (!changeOne) return;
        let message = this.formData.auditResult;
        if (now.length > old.length) {
          console.log("add ", changeOne);
          message += changeOne;
        }
        else {
          console.log("sub ", changeOne);
          message = message.replace(changeOne, "");
        }

        this.formData.auditResult = message;
      }
    }
  };
</script>

<style lang="less" rel="stylesheet/less">

  .examine-block {

    .block {
      margin-bottom: -20px;
    }

    .el-form-item {
      margin-bottom: 10px;
    }

    .page-foot {
      text-align: center;
      position: absolute;
      bottom: -80px;
      right: 0;
      left: 0;

    }

    &.mobile {
      .page-foot {
        padding: 10px;
        background-color: #fff;
        position: fixed;
        bottom: 0;
        right: 0;
        left: 0;

        .el-button {
          padding: 6px 20px;
        }
      }

      .textarea-panel {
        padding: 0 15px 15px;
      }
    }

    .textarea-panel {
      border-radius: 8px;
      overflow: hidden;

      textarea {
        border: 0;
        background-color: #f7f7f7;
      }
    }
  }
</style>
