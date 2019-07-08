<template>
  <div class="reject-messages">
    <el-checkbox-group :value="value" @input="v => $emit('input', v)">
      <el-checkbox v-for="i in messages" :key="i" :label="i"/>
    </el-checkbox-group>
  </div>
</template>

<script>
  export default {
    name: "RejectMessages",
    components: {},
    props: {
      value: {
        type: Array
      }
    },
    data() {
      return {
        messages: [
          "公司名称需要和营业执照名称完全一样；",
          "个体工商户如果没有公司名称的，公司名称填写格式个体户+姓名；",
          "身份证复印件请加盖公章；",
          "银行卡照片不能截图；",
          "图片不能有水印；",
          "商户简称需要和门头或者公司名称关联；",
          "法人身份证起始日期错；",
          "营业执照起始日期错；",
          "门头照、收银台、室内场景照不得重复进件使用；",
          "结算信息与结算银行卡信息需一致，请核实；",
        ]
      };
    },
    created() {
    },
    methods: {},
    computed: {}
  };
</script>

<style lang="less" rel="stylesheet/less">

  .reject-messages {
  }
</style>
