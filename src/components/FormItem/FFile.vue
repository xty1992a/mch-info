<template>
  <div class="f-image f-form-item" :class="isMobile?'mobile':''">
    <div style="margin-bottom: 10px;">
      <el-button ref="btn" class="upload-btn">上传图片</el-button>
      <a class="file-download" href="http://baidu.com"><i class="el-icon-download"></i>下载{{data.attachment}}</a>
      <DescBtn :text="data.description"/>
    </div>
    <div class="f-image-body" v-if="imageData">
      <img :src="imageData" alt="">
    </div>
  </div>
</template>

<script>
  import ImageUpload from "./ImageUpload";
  import Common from "./Common";

  export default {
    name: "FImage",
    components: {},
    mixins: [Common, ImageUpload],
    props: {},
    data() {
      return {};
    },
    computed: {}
  };
</script>

<style lang="less" rel="stylesheet/less">
  @import "../../styles/variable";

  .f-image {
    /*max-width: 300px;*/
    width: 300px;

    &.mobile {
      width: 100%;
    }

    .f-image-body {
      border: 1px dashed #e5e5e5;
      border-radius: 5px;
      position: relative;
      padding-bottom: 62.7%;
      overflow: hidden;
      height: 0;
      width: 100%;
    }

    img {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    }

    .file-download {
      padding: 0 15px;
      color: @activeC;
    }
  }
</style>
