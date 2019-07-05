<template>
  <div class="mch-info-add-page">
    <Container class="mch-info-add" title="商户进件">
      <Steps/>
      <section class="page-body">
        <router-view/>
      </section>
    </Container>
  </div>
</template>

<script>
  import Container from "@/components/Container";
  import { mapGetters, mapState } from "vuex";
  import Steps from "./children/Steps";

  export default {
    name: "MchInfoAdd",
    components: { Steps, Container },
    data() {
      return {};
    },
    created() {
    },
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

    .main-foot {
      background-color: #fff;
      height: 60px;
      display: flex;
      justify-content: center;
      align-items: center;

      > * {
        margin: 0 10px;
      }
    }
  }

  .desktop-app {
    .page-body {
      padding: 20px;
      border: 1px solid #f0f2f5;
      border-top: 0;
      position: relative;
      margin-bottom: 80px;
    }

    .main-foot {
      background-color: #fff;
      position: absolute;
      bottom: -80px;
      right: 0;
      left: 0;
    }
  }

  .mobile-app {
    .mch-info-add-page {
      padding-top: 70px;
      padding-bottom: 60px;
    }

    .mch-info-add-steps {
      box-shadow: 2px 0 8px rgba(0, 0, 0, 0.1);
      position: fixed;
      z-index: 2;
      right: 0;
      left: 0;
      top: 0;
    }

    .page-body {
      box-shadow: 0 0 8px rgba(0, 0, 0, 0.05);
      padding: 10px;
      margin: 10px 0 0;
      border-radius: 4px;
    }

    .main-foot {
      position: fixed;
      box-shadow: 4px 0 8px rgba(0, 0, 0, 0.1);
      bottom: 0;
      right: 0;
      left: 0;
    }

    .el-form-item__content {
      padding-left: 10px;
    }
  }
</style>
