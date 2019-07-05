<template>
  <el-dialog
          :title="title"
          :visible.sync="show"
          width="640px"
          class="paging-picker"
          @closed="close"
  >
    <section class="paging-picker-body" v-loading="onRequest">
      <!--<el-input v-model="query."></el-input>-->
      <PagingTable v-model="query" :total="totalLength" :head="false" v-if="paging">
        <el-table
                :data="list"
                height="288"
                highlight-current-row
                @row-click="pickItem"
        >
          <el-table-column
                  v-for="item in columns"
                  :key="item.prop"
                  :label="item.label"
                  :prop="item.prop"
          ></el-table-column>
          <el-table-column label="选择" width="70">
            <template slot-scope="scope">
              <p style="padding-left: 10px;">
                <i
                        class="el-icon-success"
                        :class="scope.row[props.key] === value ? 'active' : ''"
                ></i>
              </p>
            </template>
          </el-table-column>
        </el-table>
      </PagingTable>

      <div style="margin-bottom: 15px;" v-else>
        <el-table
                :data="list"
                height="288"
                highlight-current-row
                @row-click="pickItem"
        >
          <el-table-column
                  v-for="item in columns"
                  :key="item.prop"
                  :label="item.label"
                  :prop="item.prop"
          ></el-table-column>
          <el-table-column label="选择" width="70">
            <template slot-scope="scope">
              <p style="padding-left: 10px;">
                <i
                        class="el-icon-success"
                        :class="scope.row[props.key] === value ? 'active' : ''"
                ></i>
              </p>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </section>
    <div slot="footer" class="paging-picker-foot">
      <el-button @click="onCancel">取 消</el-button>
      <el-button type="primary" @click="onConfirm">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
  import { Table, TableColumn } from "element-ui";
  import PagingTable from "../../components/PagingTable";
  import Common from "./Common";

  export default {
    name: "PagingPicker",
    mixins: [Common],
    components: {
      PagingTable,
      ElTable: Table,
      ElTableColumn: TableColumn
    },
    data() {
      return {
        show: false
      };
    },
    created() {
    },
    methods: {},
    computed: {},
    watch: {
      query: {
        async handler() {
          console.log(this.list);
          if (!this.paging) return;
          if (this.onRequest) return;
          this.onRequest = true;
          const result = await this.request(this.query);
          if (result.success) {
            this.list = result.data.list;
            this.totalLength = result.data.total;
          }
          this.onRequest = false;
        },
      }
    }
  };
</script>

<style lang="less" rel="stylesheet/less">
  @import "../../styles/variable";

  .paging-picker {
    font-size: 15px;

    .el-dialog__body {
      padding: 10px 20px;

      td {
        padding: 0;
      }
    }

    .el-dialog__footer {
      padding: 10px 0 15px;
    }

    .paging-picker-body {

      .active {
        color: @activeC;
      }
    }

    .paging-picker-foot {
      margin-top: -20px;
      text-align: center;

      .el-button {
        height: 32px;
        padding: 0 20px;
      }
    }
  }
</style>
