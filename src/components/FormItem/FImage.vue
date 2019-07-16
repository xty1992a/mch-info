<template>
  <div class="f-image f-form-item" :class="isMobile ? 'mobile' : ''">
    <div style="margin-bottom: 10px;">
      <el-button ref="btn" class="upload-btn">上传图片</el-button>
      <DescBtn :text="data.description" />
    </div>
    <div class="f-image-body" v-if="value">
      <AspectRatio :width="133.3">
        <img :src="value | img_cdn" alt="" />
        <DelBtn @click="clear" />
      </AspectRatio>
    </div>
  </div>
</template>

<script>
import Common from "./Common";
import ImageUpload from "./ImageUpload";
import DelBtn from "@/components/DelAble/DelBtn";
import AspectRatio from "@/components/AspectRatio";

export default {
  name: "FImage",
  components: { DelBtn, AspectRatio },
  mixins: [Common, ImageUpload]
};
</script>

<style lang="less" rel="stylesheet/less">
.f-image {
  width: 300px;

  &.mobile {
    width: 100%;
  }

  .f-image-body {
    border: 1px dashed #e5e5e5;
    border-radius: 5px;
    position: relative;
    overflow: hidden;
  }

  img {
    object-fit: contain;
    width: 100%;
    height: 100%;
  }

  .delete-btn {
    position: absolute;
    top: 10px;
    right: 10px;
    font-size: 22px;
  }
}
</style>
