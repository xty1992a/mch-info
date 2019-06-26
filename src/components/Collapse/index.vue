<template>
  <transition :css="false" @before-enter="beforeEnter" @enter="enter" @beforeLeave="beforeLeave" @leave="leave">
    <slot></slot>
  </transition>
</template>

<script>
  import TweenManager, { Tween } from "@/utils/tween-manager";

  export default {
    name: "Collapse",
    data() {
      return {
        elHeight: 0
      };
    },
    methods: {
      transition(start, end, callback) {
        return new Promise(async resolve => {
          const manager = new TweenManager({
            duration: 150,
            start,
            end,
            easing: Tween.Quart.easeIn
          });

          while (manager.next()) {
            await TweenManager.frame();
            callback(manager.currentValue);
          }
          resolve();
        });
      },

      beforeEnter(el) {
        console.log(el);
        // this.elHeight = el.clientHeight;
      },

      async enter(el, done) {
        console.log(el.clientHeight);
        // await this.transition(0, /*this.elHeight*/100, value => {
        //   // el.style.height = value + "px";
        //   el.style.opacity = value;
        // });
        done();
      },

      beforeLeave(el) {
        console.log(el.clientHeight);
        this.elHeight = el.clientHeight;
      },

      async leave(el, done) {
        console.log("before");
        await this.transition(this.elHeight, 0, value => {
          console.log("value ", value);
          el.style.height = value + "px";
        });
        console.log("over");
        done();
      }
    },
    computed: {}
  };
</script>
