<template>
  <el-row type="flex" justify="center" class="container">
    <el-col v-bind="columns">
      <el-container style="height: 100%;">
        <el-header class="container-head" style="height: auto;">
          <h3 class="title">{{ title }}</h3>
          <slot name="head"></slot>
        </el-header>
        <el-main class="container-main">
          <slot></slot>
        </el-main>
        <el-footer class="container-foot" v-if="showFoot" style="height: auto;">
          <slot name="foot"></slot>
        </el-footer>
      </el-container>
    </el-col>
  </el-row>
</template>

<script>
export default {
  name: "Container",
  components: {},
  props: {
    head: Boolean,
    foot: Boolean,
    title: String,
    columns: {
      type: Object,
      default: () => ({
        xs: 24,
        md: 20,
        lg: 20,
        xl: 18
      })
    }
  },
  data() {
    return {};
  },
  created() {},
  methods: {},
  computed: {
    showFoot() {
      return this.$slots.hasOwnProperty("foot");
    },
    showHead() {
      return this.title || this.$slots.hasOwnProperty("head");
    }
  }
};
</script>

<style lang="less" rel="stylesheet/less">
.container {
  .container-head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 20px;

    .title {
      font-size: 18px;
    }

    .el-button {
      height: 36px;
      line-height: 36px;
      padding: 0 20px;
    }
  }

  .container-main {
    padding: 0 20px;
  }
}

.mobile-app {
  .container-head {
    display: none;
  }

  .container-main {
    padding: 15px;
  }
}
</style>
