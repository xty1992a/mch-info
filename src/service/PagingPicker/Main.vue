<template>
  <el-dialog
    title="修改费率"
    :visible.sync="show"
    width="640px"
    class="paging-picker"
    @closed="close"
  >
    <section class="fee-editor-body">
      <PagingTable v-model="query" :total="totalLength" :head="false">
        <el-table
          :data="list"
          height="240"
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
                  :class="scope.row.value === value ? 'active' : ''"
                ></i>
              </p>
            </template>
          </el-table-column>
        </el-table>
      </PagingTable>
    </section>
    <div slot="footer" class="fee-editor-foot">
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
  created() {},
  methods: {},
  computed: {},
  watch: {
    query: {
      async handler(now) {
        this.onRequest = true;
        const result = await this.request(this.query);
        if (result.success) {
          this.list = result.data;
        }
        this.onRequest = false;
      },
      immediate: true
    }
  }
};
</script>

<style lang="less" rel="stylesheet/less">
@import "../../styles/variable";

.paging-picker {
  font-size: 15px;

  .fee-editor-body {
    height: 300px;

    .active {
      color: @activeC;
    }
  }

  .fee-editor-foot {
    margin-top: -20px;
    text-align: center;
  }
}
</style>
