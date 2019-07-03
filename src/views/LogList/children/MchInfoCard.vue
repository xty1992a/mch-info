<template>
  <div class="mch-info-card" @click="enterDetail" v-show="canShow">
    <div class="van-hairline--bottom">
      <van-cell :border="false">
        <h3 slot="title" style="white-space: nowrap;">{{data.storeName}}</h3>
        <el-tag type="primary" size="mini" v-if="data.auditStatus===0">未审核</el-tag>
        <el-tag type="warning" size="mini" v-if="data.auditStatus===1">审核中</el-tag>
        <el-tag type="success" size="mini" v-if="data.auditStatus===2">审核通过</el-tag>
        <el-tag type="danger" size="mini" v-if="data.auditStatus===3">审核拒绝</el-tag>
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
      <!-- <el-dropdown trigger="click" @command="commandHandler">
         <span class="set-btn" style="margin-right: 10px;">
           更多<i class="el-icon-arrow-down el-icon&#45;&#45;right"></i>
         </span>
         <el-dropdown-menu slot="dropdown" class="log-set-dropdown">
           <el-dropdown-item
                   command="editItem"
                   :disabled="data.auditStatus===1"
                   v-role="[$roles.AGENT, $roles.MERCHANT]">编辑
           </el-dropdown-item>
           <el-dropdown-item
                   command="enterPayment"
                   v-role="[$roles.AGENT, $roles.MERCHANT]">支付参数
           </el-dropdown-item>
           <el-dropdown-item
                   command="deleteItem"
                   v-role="[$roles.MERCHANT]">删除
           </el-dropdown-item>
           <el-dropdown-item
                   command="deleteItem"
                   :disabled="data.auditStatus===1"
                   v-role="[$roles.AGENT, $roles.SERVICE]">弃用
           </el-dropdown-item>
           <el-dropdown-item
                   command="editFee"
                   :disabled="data.auditStatus!==2"
                   v-role="[$roles.AGENT, $roles.SERVICE]">修改费率
           </el-dropdown-item>
           <el-dropdown-item
                   command="checkCard"
                   :disabled="data.payeeInfoChangeStatus===0"
                   v-role="[$roles.SERVICE]">审核结算卡
           </el-dropdown-item>
           <el-dropdown-item
                   command="repeatItem"
                   v-role="[$roles.AGENT, $roles.SERVICE]" :disabled="data.channelId===0">复制进件
           </el-dropdown-item>
           <el-dropdown-item
                   command="goToAliLh"
                   v-role="[$roles.AGENT]" :disabled="!data.zfblhUrl&&data.zfblhRecord===0">参加蓝海
           </el-dropdown-item>
           <el-dropdown-item
                   command="goToWxLz"
                   v-role="[$roles.AGENT]" :disabled="!data.wxlzUrl&&data.wxlzRecord===0">参加绿洲
           </el-dropdown-item>
         </el-dropdown-menu>
       </el-dropdown>-->
      <!--      <el-button size="small"
                       @click="commandHandler('editCart')"
                       :disabled="data.auditStatus!==2"
                       v-role="[$roles.AGENT, $roles.MERCHANT]"
            >修改结算卡
            </el-button>-->
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
  import { Cell, CellGroup } from "vant";
  import { Tag } from "element-ui";
  import Commander from "./Commander";

  export default {
    name: "MchInfoCard",
    props: {
      data: Object
    },
    components: { Commander, VanCell: Cell, VanCellGroup: CellGroup, ElTag: Tag },
    data() {
      return {};
    },
    created() {
    },
    methods: {
      commandHandler(method) {
        console.log(method);
        this.$emit("invoke", method, this.data);
      },
      enterDetail() {
        if (this.role === this.$roles.SERVICE) return;
        // console.log(this.role, this.$role.Ser)
        this.commandHandler("enterDetail");
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
