<template>
  <Container title="进件详情" class="mch-info-detail">
    <section class="content">
      <DisplayBlock/>
      <ExamineBlock :is-examine="isExamine"/>
    </section>
  </Container>
</template>

<script>
  import Container from "@/components/Container";
  import DisplayBlock from "./DisplayBlock";
  import ExamineBlock from "./ExamineBlock";

  export default {
    name: "MchInfoDetail",
    components: { Container, DisplayBlock, ExamineBlock },
    data() {
      return {};
    },
    created() {
    },
    methods: {},
    computed: {
      isExamine() {
        return this.$route.query.examine === 1;
      }
    }
  };
</script>

<style lang="less" rel="stylesheet/less">
  .mch-info-detail {
    .content {
      border: 1px solid #f0f2f5;
      border-radius: 8px;
      min-height: 500px;
      padding-bottom: 30px;
    }
  }

  .desktop-app {
    .mch-info-detail {
      .content {
        position: relative;
        padding: 22px 50px;
        margin-bottom: 160px;
      }
    }
  }

  .mobile-app {
    .mch-info-detail {
      .container-main {
        padding: 0;
      }

      .content {
        padding: 10px;
        margin-bottom: 50px;
      }
    }
  }
</style>
