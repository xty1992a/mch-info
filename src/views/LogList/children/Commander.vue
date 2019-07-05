<template>
  <el-dropdown trigger="click" @command="commandHandler">
        <span class="set-btn" style="margin-right: 10px;">
          更多<i class="el-icon-arrow-down el-icon--right"></i>
        </span>
    <el-dropdown-menu slot="dropdown" class="log-set-dropdown">
      <el-dropdown-item
              command="editItem"
              :disabled="data.auditStatus===1"
              v-role="[$roles.SERVICE]">编辑
      </el-dropdown-item>
      <el-dropdown-item
              command="recheckItem"
              v-role="[$roles.AGENT, $roles.SERVICE]">重新进件
      </el-dropdown-item>
      <el-dropdown-item
              command="enterPayment"
              v-if="!isMobile"
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
      <el-dropdown-item
              command="editCart"
              :disabled="data.auditStatus!==2"
              v-role="[$roles.AGENT, $roles.MERCHANT]">修改结算卡
      </el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown>
</template>

<script>
  export default {
    name: "Commander",
    props: {
      data: Object
    },
    methods: {
      commandHandler(method) {
        this.$emit("command", method, this.data);
      },
    },
    computed: {
      isMobile() {
        return this.$store.state.App.isMobile;
      }
    }
  };
</script>
