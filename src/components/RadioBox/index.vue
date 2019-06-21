<template>
  <div class="radio-box">
    <div class="radio-item"
         @click="$emit('input',item.value)"
         :class="item.value===value?'active':''"
         v-for="item in options"
         :key="item.value">{{item.label}}
    </div>
  </div>
</template>

<script>
  export default {
    name: "RadioBox",
    components: {},
    props: {
      options: Array,
      value: String
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

  .radio-box {
    display: flex;
    flex-wrap: wrap;
    margin: 0 -5px;

    .radio-item {
      line-height: 40px;
      padding: 0 10px;
      background-color: #f9f9f9;
      color: #666;
      border-radius: 4px;
      border: 1px solid #f9f9f9;
      margin: 0 5px 8px;
      text-align: center;
      flex: 1;
      min-width: 90px;
      max-width: 47%;

      &.active {
        color: #fff;
        background-color: @activeC;
        border-color: @activeC;
      }
    }
  }
</style>
