<template>
  <Container title="进件详情" class="mch-info-detail">
    <section class="content">
      <DisplayBlock :data="blockList" :reason="pageData.audit[1].value" v-if="pageData"/>
      <ExamineBlock :data="pageData" :is-examine="isExamine" v-if="pageData"/>
    </section>
  </Container>
</template>

<script>
  import * as API from "@/api";
  import Container from "@/components/Container";
  import DisplayBlock from "./DisplayBlock";
  import ExamineBlock from "./ExamineBlock";

  export default {
    name: "MchInfoDetail",
    components: { Container, DisplayBlock, ExamineBlock },
    data() {
      return {
        pageData: null
      };
    },
    async created() {
      const id = this.$route.query.checkPaymentId;
      if (!id) {
        this.$message("缺少必要参数!");
        await this.$utils.sleep(1500);
        this.$router.push({ name: "Home" });
        return;
      }
      this.getPageData(id);
    },
    methods: {
      async getPageData(id) {
        const res = await API.getPaymentDetail({ mpsCheckPaymentId: id });
        if (res.success) {
          this.pageData = res.data;
        }
        console.log(res);
      }
    },
    computed: {
      isExamine() {
        return +this.$route.query.examine === 1;
      },
      blockList() {
        if (!this.pageData) return [];
        return this.pageData.pageDatas.map(item => ({
          title: item.tilte,
          list: item.list.map(it => ({ ...it, title: it.name, type: it.type === 3 ? "img" : "text" }))
        }));
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
        margin-bottom: 70px;
      }
    }
  }
</style>
