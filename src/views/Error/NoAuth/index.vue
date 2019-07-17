<template>
  <div class="no-auth">
    <div class="center">
      <img :src="img['no_auth']" alt="" />
      <p>{{ message }}</p>
    </div>
  </div>
</template>

<script>
import img from "@/assets/imgs";

export default {
  name: "NoAuth",
  components: {},
  data() {
    return { img };
  },
  created() {},
  methods: {},
  computed: {
    message() {
      return this.$route.query.message || "您没有访问权限";
    }
  }
};
</script>

<style lang="less" rel="stylesheet/less">
.no-auth {
  text-align: center;
  padding-top: 200px;

  .center {
    display: inline-block;
  }

  img {
    width: 200px;
  }
}
</style>
