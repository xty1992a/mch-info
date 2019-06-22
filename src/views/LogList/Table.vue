<template>
  <div class="log-table" v-loading="onRequest">
    <el-row type="flex" justify="center" style="height: 100%;">
      <el-col :md="20" :lg="18" :xl="14">
        <PagingTable
          label="进件管理"
          v-model="searchQuery"
          :total="listTotalLength"
        >
          <template slot="set">
            <el-button @click="changeQuery">查询</el-button>
            <el-button type="primary" @click="addItem">+新增</el-button>
            <el-button @click="exportList">导出变更关注列表</el-button>
          </template>

          <el-table :height="tableHeight" :data="list" style="width: 100%">
            <el-table-column prop="date" label="日期" width="180">
            </el-table-column>
            <el-table-column prop="name" label="姓名" width="180">
            </el-table-column>
            <el-table-column prop="address" label="地址"></el-table-column>

            <el-table-column label="操作" fixed="right">
              <template slot-scope="scope">
                <span class="set-btn" @click="checkItem(scope['row'])"
                  >审核</span
                >
                <span class="set-btn" @click="reAddMch(scope['row'])"
                  >重新进件</span
                >
                <el-dropdown
                  trigger="click"
                  @command="v => commandHandler(v, scope['row'])"
                >
                  <span class="set-btn ">
                    更多<i class="el-icon-arrow-down el-icon--right"></i>
                  </span>
                  <el-dropdown-menu slot="dropdown" class="log-set-dropdown">
                    <el-dropdown-item command="editItem">编辑</el-dropdown-item>
                    <el-dropdown-item command="deleteItem"
                      >删除
                    </el-dropdown-item>
                    <el-dropdown-item command="editCart"
                      >修改结算卡
                    </el-dropdown-item>
                    <el-dropdown-item command="editFee"
                      >修改费率
                    </el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
              </template>
            </el-table-column>
          </el-table>
        </PagingTable>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import Common from "./Common";
import { Table, TableColumn } from "element-ui";
import PagingTable from "../../components/PagingTable";

export default {
  name: "LogTable",
  mixins: [Common],
  components: {
    PagingTable,
    ElTable: Table,
    ElTableColumn: TableColumn
  },
  data() {
    return {
      tableHeight: 300,
      listTotalLength: 100
    };
  },
  created() {},
  methods: {
    commandHandler(method, item) {
      console.log(method, item);
      this[method](item);
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
        if (!this.$el) {
          await this.$utils.sleep(300);
        }
        const main = this.$el.getElementsByClassName("el-main")[0];
        if (!main) return;
        this.tableHeight = main.clientHeight;
      },
      immediate: true
    },
    searchQuery: {
      async handler(now) {
        this.onRequest = true;
        await this.$store.dispatch("LogList/coverList", { ...now });
        this.onRequest = false;
      },
      immediate: true
    }
  }
};
</script>

<style lang="less" rel="stylesheet/less">
@import "../../styles/variable";

.log-table {
  height: 100vh;
  min-width: 700px;
  padding-bottom: 20px;
  background-color: #fff;

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
  }
}

.log-set-dropdown {
  .el-dropdown-menu__item {
    white-space: nowrap;
  }
}
</style>
