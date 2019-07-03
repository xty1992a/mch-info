<template>
  <Container title="进件管理" class="log-table" v-loading="onRequest">
    <div slot="head">
      <el-button @click="changeQuery">查询</el-button>
      <el-button type="primary" @click="addItem">+新增</el-button>
      <el-button @click="exportList">导出变更关注列表</el-button>
    </div>
    <PagingTable ref="table" v-model="searchQuery" :total="listTotalLength">
      <!--
      mpsCheckPaymentId	integer	 进件记录主键id
      businessId	string	 商家guid
      businessName	string	 商家名称
      businessAccount	 string	 商家账号
      agentAccount	 string	 代理账号
      merchantId	  string	 商户号
      storeName 	string	 门店名称
      chainStoreId	string	 门店guid
      auditStatus 	integer	 审核状态	  0未审核 1审核中 2审核通过 3拒绝 4弃用
      createTime	integer	 创建时间
      updateTime	integer	 更新时间
      auditTime	integer	 审核时间
      auditUser	string	 审核人
      channelName	string	 渠道名称
      agentName	string	 代理名称
      agentId	string	 代理商guid
      userAgentUsers	string	 代理商跟踪人
      agentUserName	string
      wxlzRecord	integer	 是否已报名绿洲	 0 未报名 1 已报名
      zfblhRecord	integer	 是否已报名蓝海	  0 未报名 1 已报名
      industryDining	integer	 是否符合报名绿洲蓝海行业要求	 0 不符合 1 符合
      channelId	integer	 渠道id
      businessLicenceType	integer	 营业执照类型（0无1个人2企业）
      basicInfoId	integer	 基础信息id
      auditResult	string	 审核拒绝原因
      appId	string	 appid
      businessLicenseTypeName	string	 营业执照类型名称
      payParaUrl	string	 门店支付参数链接（相对地址）
      wxlzUrl	string	 报名绿洲地址（相对地址）
      zfblhUrl	string	 名蓝海地址（相对地址）
-->
      <el-table :height="tableHeight" :data="list" style="width: 100%" @row-dblclick="enterDetail">
        <el-table-column prop="businessAccount" label="商家账号"/>
        <el-table-column prop="businessName" label="商家名称"/>
        <el-table-column prop="agentAccount" label="代理商"/>
        <el-table-column prop="storeName" label="门店"/>
        <el-table-column prop="merchantId" label="商户号"/>
        <el-table-column prop="appId" label="AppId"/>
        <el-table-column prop="channelName" label="支付通道"/>
        <el-table-column prop="auditStatus" label="状态">
          <template slot-scope="scope">
            <span>{{scope.row.auditStatus | statusDis}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="createTime" label="申请时间">
          <template slot-scope="scope">
            <span>{{scope.row.createTime | date}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="updateTime" label="更新时间">
          <template slot-scope="scope">
            <span>{{scope.row.updateTime | date}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="auditTime" label="审核时间">
          <template slot-scope="scope">
            <span>{{scope.row.auditTime | date}}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" fixed="right" width="160">
          <template slot-scope="scope">
            <el-button
                    size="mini" style="border: 0;"
                    @click="editItem(scope.row)"
                    :disabled="scope.row.auditStatus===1"
                    v-role="[$roles.AGENT, $roles.MERCHANT]">编辑
            </el-button>
            <el-button size="mini" style="border: 0;"
                       @click="examineItem(scope.row)"
                       v-role="$roles.SERVICE">审核
            </el-button>
            <Commander :data="scope.row"
                       @command="v => commandHandler(v, scope['row'])"/>

            <!--            <el-dropdown
                                trigger="click"
                                @command="v => commandHandler(v, scope['row'])"
                        >
                          <span class="set-btn ">
                            更多<i class="el-icon-arrow-down el-icon&#45;&#45;right"></i>
                          </span>
                          <el-dropdown-menu slot="dropdown" class="log-set-dropdown">

                            <el-dropdown-item
                                    command="recheckItem"
                                    v-role="[$roles.AGENT, $roles.SERVICE]">重新进件
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
                                    :disabled="scope.row.auditStatus===1"
                                    v-role="[$roles.AGENT, $roles.SERVICE]">弃用
                            </el-dropdown-item>
                            <el-dropdown-item
                                    command="editFee"
                                    :disabled="scope.row.auditStatus!==2"
                                    v-role="[$roles.AGENT, $roles.SERVICE]">修改费率
                            </el-dropdown-item>
                            <el-dropdown-item
                                    command="checkCard"
                                    :disabled="scope.row.payeeInfoChangeStatus===0"
                                    v-role="[$roles.SERVICE]">审核结算卡
                            </el-dropdown-item>
                            <el-dropdown-item
                                    command="repeatItem"
                                    v-role="[$roles.AGENT, $roles.SERVICE]"
                                    :disabled="scope.row.channelId===0">复制进件
                            </el-dropdown-item>
                            <el-dropdown-item
                                    command="goToAliLh"
                                    v-role="[$roles.AGENT]"
                                    :disabled="!scope.row.zfblhUrl&&scope.row.zfblhRecord===0">参加蓝海
                            </el-dropdown-item>
                            <el-dropdown-item
                                    command="goToWxLz"
                                    v-role="[$roles.AGENT]"
                                    :disabled="!scope.row.wxlzUrl&&scope.row.wxlzRecord===0">参加绿洲
                            </el-dropdown-item>
                            <el-dropdown-item
                                    command="editCart"
                                    :disabled="scope.row.auditStatus!==2"
                                    v-role="[$roles.AGENT, $roles.MERCHANT]">修改结算卡
                            </el-dropdown-item>
                          </el-dropdown-menu>
                        </el-dropdown>-->
          </template>
        </el-table-column>
      </el-table>
    </PagingTable>
  </Container>
</template>

<script>
  import Container from "@/components/Container";
  import Common from "./Common";
  import { Table, TableColumn } from "element-ui";
  import PagingTable from "../../components/PagingTable";
  import Commander from "./children/Commander";

  export default {
    name: "LogTable",
    mixins: [Common],
    components: {
      PagingTable,
      Commander,
      ElTable: Table,
      ElTableColumn: TableColumn,
      Container
    },
    data() {
      return {
        tableHeight: 300
      };
    },
    created() {
    },
    methods: {
      commandHandler(method, item) {
        console.log(method, item);
        this[method](item);
      },
      async fetchData() {
        this.onRequest = true;
        const result = await this.$store.dispatch("LogList/coverList", { ...this.searchQuery });
        if (result.success) {
          this.listTotalLength = result.data.total;
        }
        this.onRequest = false;
      }
    },
    computed: {
      screenHeight() {
        return this.$store.state.App.screenHeight;
      }
    },
    watch: {
      screenHeight: {
        async handler() {
          if (!this.$refs.table) {
            await this.$utils.sleep(300);
          }
          const table = this.$refs.table.$el;
          const main = table.getElementsByClassName("el-main")[0];
          if (!main) return;
          this.tableHeight = main.clientHeight;
        },
        immediate: true
      },
      "searchQuery.pageIndex": {
        async handler() {
          this.fetchData();
        },
        immediate: true
      },
      listTotalLength() {
        // this.fetchData();
      }
    }
  };
</script>

<style lang="less" rel="stylesheet/less">
  @import "../../styles/variable";

  .log-table {
    height: 100vh;

    .set-btn {
      cursor: pointer;
      color: @activeC;
    }

    .el-table {
      border: 1px solid #ebeef5;
      border-bottom-width: 0;

      th {
        font-weight: bold;
        background-color: #f7f7f7;
      }

      .el-button {
      }
    }
  }

  .log-set-dropdown {
    .el-dropdown-menu__item {
      white-space: nowrap;
    }
  }
</style>
