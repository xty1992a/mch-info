<template>
  <div class="image-block" :class="isMobile ? 'mobile' : ''">
    <p class="label-top" v-if="isMobile && label">{{ label }}</p>
    <AspectRatio :width="133.3">
      <el-image
        fit="contain"
        :src="src | img_cdn"
        style="width: 100%;height: 100%;"
      >
        <div slot="error" class="image-slot">
          <i class="el-icon-picture-outline"></i>
          <p>加载失败!</p>
        </div>
      </el-image>
    </AspectRatio>
    <p class="label-bottom" v-if="!isMobile && label">{{ label }}</p>
  </div>
</template>

<script>
import AspectRatio from "@/components/AspectRatio";
import { Image } from "element-ui";

export default {
  name: "ImageBlock",
  components: { AspectRatio, ElImage: Image },
  props: {
    src: String,
    isMobile: Boolean,
    label: String
  },
  data() {
    return {};
  },
  created() {},
  methods: {},
  computed: {}
};
</script>

<style lang="less" rel="stylesheet/less">
@import "../../../styles/variable";

.image-block {
  background-color: #f5f7fa;
  border-radius: 8px;
  overflow: hidden;
  border: 1px solid #ebeef5;

  &.mobile {
    border-radius: 0;
    border: 0;
  }

  p {
    background-color: #fff;
  }

  .label-top {
    padding-bottom: 14px;
    padding-left: 5px;
  }

  .label-bottom {
    text-align: center;
    .ellipsis;
    padding: 14px;
  }

  .image-slot {
    width: 100%;
    height: 100%;
    font-size: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;

    p {
      font-size: 14px;
      background-color: transparent;
    }
  }
}
</style>
