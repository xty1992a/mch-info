<template>
      <span class="delete-btn" @click="e=>$emit('click', e)" :style="{fontSize: size}">
        <svg-icon icon="delete"/>
      </span>
</template>

<script>
  export default {
    name: "DeleteBtn",
    props: {
      size: {
        type: String,
        default: "22px"
      }
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

<style lang="less" rel="stylesheet/less">
  @import "../../styles/variable";

  .delete-btn {
    width: 1em;
    height: 1em;
    border-radius: 50%;
    background-color: #fff;
    line-height: 1;
    overflow: hidden;
    color: @dangerC;
    cursor: pointer;
  }
</style>
