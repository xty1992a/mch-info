<template>
  <div id="app" :class="screenType === 'xs' ? 'mobile-app' : 'desktop-app'">
    <keep-alive :include="aliveRoutes">
      <router-view />
    </keep-alive>
  </div>
</template>

<script>
export default {
  name: "App",
  created() {
    this.debouncedResize &&
      window.removeEventListener("resize", this.debouncedResize);
    this.debouncedResize = this.$utils.debounce(this.resize);
    this.debouncedResize();
    window.addEventListener("resize", this.debouncedResize);
  },
  methods: {
    resize() {
      const width = document.documentElement.clientWidth;
      const height = document.documentElement.clientHeight;
      this.$store.commit("App/SET_SCREEN_WIDTH", width);
      this.$store.commit("App/SET_SCREEN_HEIGHT", height);
    }
  },
  computed: {
    isMobile() {
      return this.$store.state.App.isMobile;
    },
    screenType() {
      return this.$store.getters["App/screenType"];
    },
    aliveRoutes() {
      return this.$store.state.App.aliveRoutes;
    }
  }
};
</script>

<style>
#app {
  min-height: 100vh;
  background-color: #fff;
}
</style>
