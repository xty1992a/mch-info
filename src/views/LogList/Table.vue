<template>
  <Container title="进件管理" class="log-table" v-loading="onRequest">
    <div slot="head">
      <el-button @click="changeQuery">查询</el-button>
      <el-button type="primary" @click="addItem">+新增</el-button>
      <el-button @click="exportList" v-role="[$roles.SERVICE]"
        >导出变更关注列表
      </el-button>
    </div>
    <PagingTable
      ref="table"
      v-model="searchQuery"
      :total="listTotalLength"
      class="log-paging-table"
    >
      <el-table
        :height="tableHeight"
        :data="list"
        style="width: 100%"
        @row-dblclick="enterDetail"
      >
        <el-table-column
          prop="businessAccount"
          label="商家账号"
          v-if="[$roles.SERVICE, $roles.AGENT].includes(role)"
        />
        <el-table-column
          prop="businessName"
          label="商家名称"
          v-if="[$roles.SERVICE, $roles.AGENT].includes(role)"
        />
        <el-table-column
          prop="agentAccount"
          label="代理商"
          v-if="[$roles.SERVICE, 'TEST'].includes(role)"
        >
          <template slot-scope="scope">
            <span :title="scope.row.agentUserName">{{
              scope.row.agentAccount
            }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="storeName" label="门店" />
        <el-table-column prop="merchantId" label="商户号" />
        <el-table-column prop="appId" label="AppId" />
        <el-table-column prop="channelName" label="支付通道" />
        <el-table-column prop="auditStatus" label="状态">
          <template slot-scope="scope">
            <el-tag
              type="primary"
              size="mini"
              v-if="scope.row.auditStatus === 0"
              >未审核
            </el-tag>
            <el-tag
              type="warning"
              size="mini"
              v-if="scope.row.auditStatus === 1"
              >审核中
            </el-tag>
            <el-tag
              type="success"
              size="mini"
              v-if="scope.row.auditStatus === 2"
              >通过
            </el-tag>
            <el-tag
              type="danger"
              size="mini"
              v-if="scope.row.auditStatus === 3"
              @click="showReason(scope.row)"
              :title="scope.row.auditResult"
            >
              <span>拒绝</span>
              <i class="el-icon-warning"></i>
            </el-tag>
            <el-tag type="info" size="mini" v-if="scope.row.auditStatus === 4"
              >弃用
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="createTime" label="申请时间">
          <template slot-scope="scope">
            <span :title="$dayjs(scope.row.createTime).format('YYYY-MM-DD')">{{
              scope.row.createTime | date
            }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="auditTime" label="审核时间">
          <template slot-scope="scope">
            <span :title="$dayjs(scope.row.auditTime).format('YYYY-MM-DD')">{{
              scope.row.auditTime | date
            }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" fixed="right" width="160">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="editItem(scope.row)"
              :disabled="scope.row.auditStatus === 1"
              v-role="[$roles.AGENT, $roles.MERCHANT]"
              >编辑
            </el-button>
            <el-button
              size="mini"
              @click="examineItem(scope.row)"
              v-role="$roles.SERVICE"
              >审核
            </el-button>
            <Commander
              :data="scope.row"
              @command="v => commandHandler(v, scope['row'])"
            />
          </template>
        </el-table-column>
      </el-table>
    </PagingTable>
  </Container>
</template>

<script>
import Container from "@/components/Container";
import Common from "./Common";
import { Table, TableColumn, Tag, MessageBox } from "element-ui";
import PagingTable from "../../components/PagingTable";
import Commander from "./children/Commander";

export default {
  name: "LogTable",
  mixins: [Common],
  components: {
    PagingTable,
    Commander,
    ElTable: Table,
    ElTag: Tag,
    ElTableColumn: TableColumn,
    Container
  },
  data() {
    return {
      tableHeight: 300
    };
  },
  activated() {
    if (this.$store.state.LogList.shouldRefresh) {
      this.searchQuery = { ...this.searchQuery };
      this.$store.commit("LogList/SET_SHOULD_REFRESH", false);
    }
  },
  methods: {
    showReason(item) {
      MessageBox.alert(item.auditResult, "拒绝原因");
    },
    commandHandler(method, item) {
      console.log(method, item);
      this[method](item);
    },
    async fetchData() {
      console.log("fetch data");
      this.onRequest = true;
      const result = await this.$store.dispatch("LogList/coverList", {
        ...this.searchQuery
      });
      if (result.success) {
        this.listTotalLength = result.data.total;
      }
      this.onRequest = false;
    }
  },
  computed: {
    screenHeight() {
      return this.$store.state.App.screenHeight;
    },
    role() {
      return this.$store.state.User.userInfo.role;
    }
  },
  watch: {
    screenHeight: {
      async handler() {
        if (!this.$refs.table) {
          await this.$utils.sleep(300);
        }
        if (!this.$refs.table && !this.$refs.table.$el) {
          console.log("table & no $el");
        }
        if (!this.$refs.table) return;
        const table = this.$refs.table.$el;
        const main = table.getElementsByClassName("el-main")[0];
        if (!main) return;
        this.tableHeight = main.clientHeight;
      },
      immediate: true
    },
    searchQuery: {
      async handler() {
        console.log("asdf");
        this.onRequest = true;
        const result = await this.getData({ isList: false });
        this.hadRequest = true;
        this.onRequest = false;
        if (result.success) {
          this.listTotalLength = result.data.total;
        }
      }
    }
    /*      "searchQuery.pageIndex": {
                  async handler(now) {
                    console.log(now, "<---------");
                    this.fetchData();
                  },
                  immediate: true
                },*/
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

  .log-paging-table {
    height: calc(100vh - 80px);

    .el-main {
      overflow: hidden;
    }
  }

  .el-table {
    border: 1px solid #ebeef5;
    border-bottom-width: 0;

    td {
      padding: 5px 0;
    }

    .el-table__header-wrapper {
      background-color: #f7f7f7;
    }

    th {
      font-weight: bold;
      background-color: #f7f7f7;
    }

    .el-button {
      background-color: transparent;
      font-size: 14px;
      border: 0;
    }
  }
}

.log-set-dropdown {
  .el-dropdown-menu__item {
    white-space: nowrap;
  }
}
</style>
