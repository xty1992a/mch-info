<template>
  <el-container class="paging-table">
    <el-header class="paging-head" height="50px" v-if="head">
      <h3 class="label">
        <b>{{ label }}</b>
      </h3>
      <div class="set-block">
        <slot name="set"></slot>
      </div>
    </el-header>
    <el-main class="paging-main">
      <slot></slot>
    </el-main>
    <el-footer class="paging-foot">
      <el-pagination
        :current-page.sync="pageIndex"
        :page-sizes="pageSizes"
        :page-size.sync="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      />
    </el-footer>
  </el-container>
</template>

<script>
import { Pagination } from "element-ui";

export default {
  name: "PagingTable",
  props: {
    label: String,
    value: {
      type: Object,
      validate: v => ["pageIndex", "pageSize"].every(k => v.hasOwnProperty(k))
    },
    head: {
      type: Boolean,
      default: true
    },
    pageSizes: {
      type: Array,
      default: () => [10, 20, 30, 40]
    },
    total: Number
  },
  components: { ElPagination: Pagination },
  computed: {
    pageIndex: {
      get() {
        return this.value.pageIndex;
      },
      set(v) {
        this.$emit("input", { ...this.value, pageIndex: v });
      }
    },
    pageSize: {
      get() {
        return this.value.pageSize;
      },
      set(v) {
        this.$emit("input", { ...this.value, pageSize: v });
      }
    }
  }
};
</script>

<style lang="less" rel="stylesheet/less">
.paging-table {
  height: 100%;

  .paging-head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px 20px;

    .label {
      font-size: 18px;
    }

    .el-button {
      height: 36px;
      line-height: 36px;
      padding: 0 20px;
    }
  }

  .paging-main {
    padding: 0 20px;
  }

  .paging-foot {
    padding-top: 15px;
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }
}
</style>
