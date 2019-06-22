<template>
  <div class="mch-info-add">
    <el-row type="flex" justify="center">
      <el-col
        class="mch-info-add-container"
        style="position: relative;"
        :md="20"
        :lg="18"
        :xl="14"
      >
        <h3>结算信息修改申请</h3>
        <Steps />
        <section class="page-body">
          <router-view />
        </section>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { mapGetters, mapState } from "vuex";
import Steps from "./children/Steps";

export default {
  name: "MchInfoAdd",
  components: { Steps },
  data() {
    return {};
  },
  created() {},
  methods: {},
  computed: {
    ...mapState("App", ["isMobile"]),
    ...mapGetters("MchInfo", ["nextPage", "prevPage"])
  },
  watch: {
    $route: {
      handler() {
        this.$store.commit("MchInfo/SET_CURRENT_PAGE", this.$route.name);
      },
      immediate: true
    }
  }
};
</script>

<style lang="less" rel="stylesheet/less">
.mch-info-add {
  min-height: 100vh;
  background-color: #fff;

  .page-body {
    background-color: #fff;
    padding: 20px;
    border: 1px solid #f0f2f5;
    border-top: 0;
  }

  .main-foot {
    background-color: #fff;
    position: absolute;
    height: 60px;
    display: flex;
    justify-content: center;
    align-items: center;
    bottom: 0;
    right: 0;
    left: 0;

    > * {
      margin: 0 10px;
    }
  }
}

.desktop-app {
  .mch-info-add-container {
    padding-bottom: 60px;

    h3 {
      padding: 18px;
    }

    .main-foot {
      position: absolute;
    }
  }
}

.mobile-app {
  .mch-info-add-container {
    h3 {
      display: none;
    }

    .main-foot {
      position: fixed;
      box-shadow: 4px 0 8px rgba(0, 0, 0, 0.1);
    }
  }

  .mch-info-add {
    padding-bottom: 60px;
  }

  .page-body {
    padding: 10px;
    margin: 10px;
    border-radius: 4px;
    box-shadow: 2px 0 8px rgba(0, 0, 0, 0.05);
  }

  .mch-info-add-foot {
    background-color: #fff;
    z-index: 10;
    box-shadow: 2px 0 8px rgba(0, 0, 0, 0.1);
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
  }

  .el-form-item__content {
    padding-left: 10px;
  }
}
</style>
