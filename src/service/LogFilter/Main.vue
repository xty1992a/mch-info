<template>
  <el-dialog
          title="查询"
          :visible.sync="show"
          width="680px"
          class="log-filter"
          @closed="close">
    <section class="log-filter-body">
      <el-form v-model="formData" label-position="left" label-width="90px" inline>
        <el-form-item label="商家账号">
          <el-input v-model="formData.businessAccount" placeholder="请输入商家账号"/>
        </el-form-item>
        <el-form-item label="商家名称">
          <el-input v-model="formData.businessName" placeholder="请输入商家名称"/>
        </el-form-item>
        <el-form-item label="代理商名称">
          <el-input v-model="formData.dlsName" placeholder="请输入代理商名称"/>
        </el-form-item>
        <el-form-item label="门店名称">
          <el-input v-model="formData.chainStoreName" placeholder="请输入门店名称"/>
        </el-form-item>
        <el-form-item label="进件结果">
          <el-select v-model="formData.checkStatus">
            <el-option v-for="item in checkOptions" :key="item.value" :value="item.value" :label="item.label"/>
          </el-select>
        </el-form-item>
        <el-form-item label="审核结果">
          <el-select v-model="formData.mchStatus">
            <el-option v-for="item in mchOptions" :key="item.value" :value="item.value" :label="item.label"/>
          </el-select>
        </el-form-item>
        <el-form-item label="审核时间" style="display: block; width: 100%;">
          <FDateRange :is-mobile="false" :data="{}" v-model="formData.requestTime"/>
        </el-form-item>
        <el-form-item label="审核时间" style="display: block; width: 100%;">
          <FDateRange :is-mobile="false" :data="{}" v-model="formData.mchTime"/>
        </el-form-item>
        <el-form-item label="结算周期">
          <el-select v-model="formData.payTimes">
            <el-option v-for="item in payOptions" :key="item.value" :value="item.value" :label="item.label"/>
          </el-select>
        </el-form-item>
      </el-form>
    </section>
    <div slot="footer" class="log-filter-foot">
      <el-button @click="syncForm">重置</el-button>
      <el-button type="primary" @click="onConfirm">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
  import Common from "./Common";

  export default {
    name: "LogFilter",
    components: {},
    mixins: [Common],
    data() {
      return {
        show: false
      };
    },
    created() {
    },
    methods: {},
    computed: {}
  };
</script>

<style lang="less" rel="stylesheet/less">
  @import "../../styles/variable";

  .log-filter {
    font-size: 15px;

    .el-form {
      .el-form-item {
        width: 49%;
        margin-right: 0;
      }

      .f-date-range {
      }

      .el-input {
        width: 200px;
      }
    }

    .log-filter-foot {
      text-align: center;
      padding-bottom: 20px;
    }
  }

</style>
