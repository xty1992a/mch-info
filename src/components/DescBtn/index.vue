<template>
  <div class="desc-btn" v-if="text">
    <el-popover
            placement="top-start"
            title="温馨提示"
            width="200"
            trigger="hover"
            :content="text">
      <i slot="reference" class="el-icon-question"></i>
    </el-popover>
  </div>
</template>

<script>
  export default {
    name: "DescBtn",
    components: {},
    props: {
      text: String
    },
    data() {
      return {};
    },
    created() {
    },
    methods: {},
    computed: {}
  };
</script>

<style lang="less" rel="stylesheet/less" scoped>

  .desc-btn {
    color: #DCDFE6;
    font-size: 18px;
    display: inline-block;
  }
</style>
