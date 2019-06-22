<template>
  <div class="m-edit-card"></div>
</template>

<script>
import Common from "./Common";

import { Cell } from "vant";

export default {
  name: "MEditCard",
  mixins: [Common],
  components: { VanCell: Cell },
  data() {
    return {};
  },
  created() {},
  methods: {},
  computed: {}
};
</script>

<style lang="less" rel="stylesheet/less">
.m-edit-card {
  background-color: #fff;
  min-height: 100vh;

  padding-bottom: 80px;

  .fixed-foot {
    position: fixed;
    bottom: 0;
    right: 0;
    left: 0;
    background-color: #fff;
    box-shadow: 2px 0 8px rgba(0, 0, 0, 0.1);

    padding: 10px;

    .el-button {
      width: 100%;
      height: 44px;
      line-height: 44px;
    }
  }
}
</style>
