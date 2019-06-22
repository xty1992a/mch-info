<template>
  <div class="f-form-item f-text-area" :class="isMobile ? 'mobile' : ''">
    <el-input
      type="textarea"
      v-bind="$attrs"
      :name="data.title"
      v-model="vValue"
      :placeholder="placeholder"
    />
    <DescBtn :text="data.description" />
  </div>
</template>

<script>
import Common from "./Common";

export default {
  name: "FTextArea",
  mixins: [Common]
};
</script>

<style lang="less" rel="stylesheet/less">
.f-text-area {
  .el-textarea {
    width: 500px;
    vertical-align: top;
  }

  &.mobile {
    .el-textarea {
      width: calc(100% - 30px);
    }
  }
}
</style>
