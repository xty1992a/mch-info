<template>
  <div class="mch-info-card" @click="commandHandler('enterDetail')">
    <div class="van-hairline--bottom">
      <van-cell :border="false">
        <h3 slot="title" style="white-space: nowrap;">贡茶与千层(泉州官桥塔峰店)</h3>
        <el-tag type="info" size="mini">未审核</el-tag>
      </van-cell>
      <van-cell :border="false" title="商家账户" value="asdf"/>
      <van-cell :border="false" title="商户号" value="12354"/>
      <van-cell :border="false" title="代理商账号" value="qwe"/>
      <van-cell :border="false" title="审核时间" value="2019-06-06"/>
      <van-cell :border="false" title="申请时间" value="2019-06-06"/>
      <van-cell :border="false" title="支付通道" value="得仕"/>
      <van-cell :border="false" title="Appid" value="wx123sdfasd12"/>
    </div>
    <div class="card-foot" @click.stop>
      <el-dropdown trigger="click" @command="commandHandler">
        <span class="set-btn" style="margin-right: 10px;">
          更多<i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown" class="log-set-dropdown">
          <el-dropdown-item command="editItem">编辑</el-dropdown-item>
          <el-dropdown-item command="enterPayment">支付参数</el-dropdown-item>
          <el-dropdown-item command="deleteItem">删除</el-dropdown-item>
          <el-dropdown-item command="editFee">修改费率</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <el-button size="small" @click="commandHandler('editCart')">修改结算卡</el-button>
      <el-button size="small" @click="commandHandler('recheckItem')">重新进件</el-button>
      <el-button size="small" @click="commandHandler('examineItem')">审核</el-button>
    </div>
  </div>
</template>

<script>
  import { Cell, CellGroup } from "vant";
  import { Tag } from "element-ui";

  export default {
    name: "MchInfoCard",
    props: {
      data: Object
    },
    components: { VanCell: Cell, VanCellGroup: CellGroup, ElTag: Tag },
    data() {
      return {};
    },
    created() {
    },
    methods: {
      commandHandler(method) {
        this.$emit("invoke", method, this.data);
      }
    },
    computed: {}
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
