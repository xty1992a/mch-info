<template>
  <transition-group
          :css="false"
          @before-leave="beforeLeave"
          @leave="leave"
          @after-leave="afterLeave"
          class="left-go-transition"
          :tag="tag"
  >
    <slot></slot>
  </transition-group>
</template>

<script>
  import TweenManager, { Tween } from "@/utils/tween-manager";

  export default {
    name: "LeftGoTransition",
    props: {
      tag: {
        type: String,
        default: "span"
      }
    },
    data() {
      return {
        elHeight: 0
      };
    },
    methods: {
      async goAside(el) {
        const manager = new TweenManager({
          duration: 150,
          start: 0,
          end: 100,
          easing: Tween.Quart.easeIn
        });

        while (manager.next()) {
          await TweenManager.frame();
          el.style.transform = `translate3d(${manager.currentValue}%,0,0)`;
        }
      },

      async collapse(el) {
        const manager = new TweenManager({
          duration: 150,
          start: this.elHeight,
          end: 0,
          easing: Tween.Quart.easeIn
        });

        while (manager.next()) {
          await TweenManager.frame();
          el.style.height = manager.currentValue + "px";
        }
      },

      beforeLeave(el) {
        this.elHeight = el.clientHeight;
      },
      async leave(el, done) {
        await this.goAside(el);
        await this.collapse(el);
        done();
      },
      afterLeave(el) {
      }
    }
  };
</script>
