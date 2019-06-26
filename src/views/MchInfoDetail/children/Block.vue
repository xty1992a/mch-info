<template>
  <div class="block" :class="isMobile?'mobile':''">
    <h3 class="block-title">{{title}}</h3>
    <div class="block-body">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  export default {
    name: "Block",
    props: {
      title: String,
      isMobile: Boolean
    }
  };
</script>

<style lang="less" rel="stylesheet/less">

  .block {
    .block-title {
      background-color: #f5f7fa;
      padding: 15px 20px;
      font-weight: bold;
      font-size: 16px;
      color: #303133;
    }

    .block-body {
      padding: 20px;
      background-color: #fff;
    }

    &.mobile {
      background-color: #fff;
      border-radius: 8px;
      overflow: hidden;
      box-shadow: 0 4px 16px rgba(0, 0, 0, 0.05);

      .block-title {
        background-color: #fff;
        padding: 20px 10px 10px;
      }

      .block-body {
        padding: 0;
      }
    }
  }
</style>
