<template>
  <div class="mch-info-card" @click="enterDetail" v-show="canShow">
    <div class="van-hairline--bottom">
      <van-cell :border="false">
        <h3 slot="title" style="white-space: nowrap;">{{data.storeName}}</h3>
        <el-tag type="primary" size="mini" v-if="data.auditStatus===0">未审核</el-tag>
        <el-tag type="warning" size="mini" v-if="data.auditStatus===1">审核中</el-tag>
        <el-tag type="success" size="mini" v-if="data.auditStatus===2">审核通过</el-tag>
        <el-tag type="danger" size="mini" v-if="data.auditStatus===3" @click.stop="showReason">
          <span>拒绝</span>
          <i class="el-icon-warning"></i>
        </el-tag>
        <el-tag type="info" size="mini" v-if="data.auditStatus===4">弃用</el-tag>
      </van-cell>
      <van-cell :border="false" title="商家账户" :value="data.businessAccount"/>
      <van-cell :border="false" title="商户号" :value="data.merchantId"/>
      <van-cell :border="false" title="代理商账号" :value="data.agentAccount"/>
      <van-cell :border="false" title="审核时间" :value="data.auditTime"/>
      <van-cell :border="false" title="申请时间" :value="data.createTime"/>
      <van-cell :border="false" title="支付通道" :value="data.channelName"/>
      <van-cell :border="false" title="Appid" :value="data.appId"/>
    </div>
    <div class="card-foot" @click.stop>
      <Commander :data="data" @command="commandHandler"/>
      <el-button size="small"
                 @click="v=>commandHandler('editItem')"
                 :disabled="data.auditStatus===1"
                 v-role="[$roles.AGENT, $roles.MERCHANT]">编辑
      </el-button>
      <el-button size="small"
                 @click="v=>commandHandler('examineItem')"
                 v-role="$roles.SERVICE">审核
      </el-button>
    </div>
  </div>
</template>

<script>
  import { Cell, CellGroup, Dialog } from "vant";
  import { Tag } from "element-ui";
  import Commander from "./Commander";

  export default {
    name: "MchInfoCard",
    props: {
      data: Object
    },
    components: { Commander, VanCell: Cell, VanCellGroup: CellGroup, ElTag: Tag },
    methods: {
      commandHandler(method) {
        console.log(method);
        this.$emit("invoke", method, this.data);
      },
      enterDetail() {
        if (this.role === this.$roles.SERVICE) return;
        // console.log(this.role, this.$role.Ser)
        this.commandHandler("enterDetail");
      },
      showReason() {
        Dialog({
          title: "拒绝原因",
          message: this.data.auditResult
        });
      }
    },
    computed: {
      role() {
        return this.$store.state.User.userInfo.role;
      },
      canShow() {
        // 商家不能看见弃用记录
        return this.role !== this.$roles.MERCHANT || this.data.auditStatus !== 4;
      }
    }
  };
</script>

<style lang="less" rel="stylesheet/less">
  .mch-info-card {
    padding: 10px 14px 0;
    background-color: #fff;
    box-shadow: 2px 0 8px rgba(0, 0, 0, 0.1);
    border-radius: 4px;
    margin-bottom: 15px;

    .van-cell {
      padding: 4px 5px;
    }

    .card-foot {
      white-space: nowrap;
      padding: 10px 0;
    }
  }
</style>
