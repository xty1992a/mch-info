<template>
  <el-dialog
          title="查询"
          :visible.sync="show"
          width="680px"
          class="log-filter"
          @closed="close">
    <section class="log-filter-body" @keypress.enter="onConfirm">
      <el-form v-model="formData" ref="form" label-position="left" label-width="90px" inline>
        <el-form-item label="商家账号" prop="businessAccount" v-role="[$roles.SERVICE, $roles.AGENT]">
          <el-input v-model="formData.businessAccount" placeholder="请输入商家账号"/>
        </el-form-item>
        <el-form-item label="商家名称" prop="businessName" v-role="[$roles.SERVICE, $roles.AGENT]">
          <el-input v-model="formData.businessName" placeholder="请输入商家名称"/>
        </el-form-item>
        <el-form-item label="商户号" prop="subMerchantId" v-role="[$roles.SERVICE, $roles.AGENT]">
          <el-input v-model="formData.subMerchantId" placeholder="请输入商户号"/>
        </el-form-item>
        <el-form-item label="代理商名称" prop="agentAccount" v-role="[$roles.SERVICE]">
          <el-input v-model="formData.agentAccount" placeholder="请输入代理商账号"/>
        </el-form-item>
        <el-form-item label="门店名称" prop="storeName">
          <el-input v-model="formData.storeName" placeholder="请输入门店名称"/>
        </el-form-item>
        <el-form-item label="进件结果" prop="existMerchantId">
          <el-select v-model="formData.existMerchantId">
            <el-option v-for="item in checkOptions" :key="item.value" :value="item.value" :label="item.label"/>
          </el-select>
        </el-form-item>
        <el-form-item label="进件渠道" prop="channel">
          <el-select v-model="formData.channel">
            <el-option v-for="item in channelList" :key="item.value" :value="item.value" :label="item.label"/>
          </el-select>
        </el-form-item>
        <el-form-item label="审核状态" prop="auditStatus" style="display: block;width: 100%;">
          <!--<el-select v-model="formData.auditStatus">-->
          <!--<el-option v-for="item in mchOptions" :key="item.value" :value="item.value" :label="item.label"/>-->
          <!--</el-select>-->
          <el-checkbox-group v-model="formData.auditStatus">
            <el-checkbox v-for="item in mchOptions" :key="item.value" :label="item.value">
              {{item.label}}
            </el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="申请时间" prop="startEndDate" style="display: block; width: 100%;">
          <FDateRange :is-mobile="false" :min="minDate" :max="maxDate" :forever="false"
                      :data="{}" v-model="formData.startEndDate"/>
        </el-form-item>
        <!--<el-form-item label="审核时间" style="display: block; width: 100%;">-->
        <!--<FDateRange :is-mobile="false" :data="{}" v-model="formData.updateTime"/>-->
        <!--</el-form-item>-->
        <el-form-item label="审核时间" prop="auditStartEndDate" style="display: block; width: 100%;">
          <FDateRange :is-mobile="false" :data="{}" :min="minDate" :max="maxDate"
                      v-model="formData.auditStartEndDate"/>
        </el-form-item>
      </el-form>
    </section>
    <div slot="footer" class="log-filter-foot">
      <el-button @click="resetFrom">重置</el-button>
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
    computed: {
      auditStatus: {
        get() {
          return this.formData.auditStatus ? this.formData.auditStatus.split(",") : [];
        },
        set(v) {
          this.formData.auditStatus = v.join(",");
        }
      }
    }
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
        margin-bottom: 10px;
      }

      .f-date-range {
      }

      .el-input {
        width: 200px;
      }
    }

    .log-filter-foot {
      margin-top: -30px;
      text-align: center;
    }
  }

</style>
