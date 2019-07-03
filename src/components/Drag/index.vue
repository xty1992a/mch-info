<template>
  <div class="drag">
    <slot></slot>
  </div>
</template>

<script>
  import Sorter from "@redbuck/sorter";

  export default {
    name: "drag",
    components: {},
    data() {
      return {
        sorter: null
      };
    },
    props: {
      handler: {
        type: String,
        default: "handler"
      },
      data: {
        type: Array,
        required: true
      }
    },
    mounted() {
      this.createDrag();
    },
    methods: {
      createDrag() {
        setTimeout(() => {
          let list = this.$slots.default[0].elm;
          if (list) {
            this.sorter = new Sorter(list, {
              handlerClassName: this.handler,
              change: false
            });
            this.sorter.on("drag-over", ({ source, target }) => {
              console.log(source, target);
              this.$emit("drag-over", { source, target });
            });
            this.sorter.on("click-over", payload => {
              this.$emit("click-over", payload);
            });
            this.sorter.on("swap-over", payload => {
              this.$emit("click-over", payload);
            });
          }
        }, 20);
      },
      refresh() {
        this.sorter.freshThreshold();
      }
    },
    watch: {
      data: {
        handler() {
          setTimeout(() => {
            this.sorter.freshThreshold();
          }, 320);
        },
        immediate: true
      }
    }
  };
</script>

<style lang="less">
  .drag {
    user-select: none;
    position: relative;
    height: 100%;
  }

  .drag-move {
    transition: 0.3s;
  }
</style>
