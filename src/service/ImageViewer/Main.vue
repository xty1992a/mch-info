<template>
  <van-popup
    class="image-viewer"
    :class="isMobile ? 'mobile' : 'desktop'"
    v-model="show"
    position="center"
    @closed="close"
  >
    <section>
      <div class="nav-btn prev" @click="prev" v-show="!isMobile">
        <i class="el-icon-arrow-left"></i>
      </div>
      <div class="nav-btn next" @click="next" v-show="!isMobile">
        <i class="el-icon-arrow-right"></i>
      </div>
      <van-swipe
        :autoplay="0"
        ref="swipe"
        indicator-color="white"
        style="width: 100%;height: 100%;"
        :show-indicators="false"
      >
        <van-swipe-item
          v-for="(img, i) in images"
          :key="i"
          @click="onTouchEnd"
          @mousewheel.native="mouseWheel"
        >
          <!--<van-image :src="i" fit="contain" v-if="!isMobile" width="100%" height="100%" @mousewheel.native="mouseWheel"/>-->
          <img :src="img" alt="" :style="i === current ? { transform } : ''" />
        </van-swipe-item>
      </van-swipe>
    </section>
  </van-popup>
</template>

<script>
import { Popup, Swipe, SwipeItem, Image } from "vant";

export default {
  name: "ImageViewer",
  components: {
    VanPopup: Popup,
    VanSwipe: Swipe,
    VanSwipeItem: SwipeItem,
    VanImage: Image
  },
  data() {
    return {
      show: false,
      current: 0,
      rate: 1
    };
  },
  mounted() {
    console.log(this.current);
    setTimeout(() => {
      this.swipeTo(this.current);
    }, 20);
  },
  methods: {
    onCancel() {
      this.resolve({ success: false, value: this.value });
      this.show = false;
    },
    onConfirm({ value }) {
      console.log(value);
      this.resolve({ success: true, value });
      this.show = false;
    },
    onTouchEnd(e) {
      console.log(e.target);
      if (e.target.nodeName.toLowerCase() !== "img") {
        this.show = false;
      }
    },

    mouseWheel(e) {
      console.log(e.wheelDeltaY, this.rate);
      if (e.wheelDeltaY < 0) {
        console.log("up");
        this.rate = Math.min(4, this.rate + 0.1);
      } else {
        this.rate = Math.max(1, this.rate - 0.1);
      }
    },

    swipeTo(index) {
      console.log("move to ", this.$refs.swipe, index);
      this.rate = 1;
      this.current = index;
      this.$refs.swipe && this.$refs.swipe.swipeTo(index);
    },

    next() {
      console.log("下一步");
      let index = this.current + 1;
      if (index === this.images.length) {
        console.log("到底了", index);
        index = 0;
      }
      this.swipeTo(index);
    },

    prev() {
      let index = this.current - 1;
      if (index === -1) {
        console.log("到头了", index);
        index = this.images.length - 1;
      }
      this.swipeTo(index);
    },

    close() {
      this.$destroy(true);
    }
  },
  computed: {
    transform() {
      return `scale(${this.rate})`;
    }
  },
  beforeDestroy() {
    this.$el && this.$el.remove();
  }
};
</script>

<style lang="less" rel="stylesheet/less">
@import "../../styles/variable";

.image-viewer {
  overflow: visible;
  font-size: 15px;
  background-color: transparent;

  &.desktop {
    section {
      width: 100vw;
      height: 100vh;
    }
  }

  &.mobile {
    section {
      width: 100vw;
      height: 100vh;
    }
  }

  section {
    position: relative;

    img {
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      max-width: 100%;
      max-height: 100%;
      margin: auto;
    }

    .nav-btn {
      transform: translateY(-50%);
      position: absolute;
      top: 50%;
      font-size: 100px;
      border-radius: 50%;
      z-index: 1;

      &:hover {
        color: #fff;
      }

      &.prev {
        left: 10px;
      }

      &.next {
        right: 10px;
      }
    }
  }
}
</style>
