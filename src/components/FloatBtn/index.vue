<template>
  <div class="float-btn" @click="e => $emit('click', e)" :style="{bottom, right}">
    <slot></slot>
  </div>
</template>

<script>
  export default {
    name: "FloatBtn",
    components: {},
    props: {
      bottom: {
        type: String,
        default: "70px"
      },
      right: {
        type: String,
        default: "15px"
      }
    }
  };
</script>

<style lang="less" rel="stylesheet/less">

  .float-btn {
    width: 50px;
    height: 50px;
    box-shadow: 2px 0 8px rgba(0, 0, 0, 0.15);
    border-radius: 50%;
    overflow: hidden;
    position: fixed;
    background-color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>
