<template>
  <Container title="进件详情" class="mch-info-detail">
    <section class="content">
      <DisplayBlock />
    </section>
  </Container>
</template>

<script>
import Container from "@/components/Container";

export default {
  name: "MchInfoDetail",
  components: { Container },
  data() {
    return {};
  },
  created() {},
  methods: {},
  computed: {}
};
</script>

<style lang="less" rel="stylesheet/less">
.mch-info-detail {
  .content {
    border: 1px solid #f0f2f5;
    border-radius: 8px;
    min-height: 500px;
  }
}
</style>
