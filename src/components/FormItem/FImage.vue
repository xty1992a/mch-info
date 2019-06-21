<template>
  <div class="f-image f-form-item" :class="isMobile?'mobile':''">
    <div style="margin-bottom: 10px;">
      <el-button ref="btn" class="upload-btn">上传图片</el-button>
      <DescBtn :text="data.description"/>
    </div>
    <div class="f-image-body" v-if="imageData">
      <img :src="imageData" alt="">
      <DelBtn/>
    </div>
  </div>
</template>

<script>
  import DelBtn from "@/components/DelAble/DelBtn";
  import ImageUploader from "@redbuck/image-uploader";
  import "@redbuck/image-uploader/lib/imageUploader.css";
  import Common from "./Common";
  import imgs from "@/assets/imgs";

  export default {
    name: "FImage",
    components: { DelBtn },
    mixins: [Common],
    props: {},
    data() {
      return {
        imageData: imgs.no_auth
      };
    },
    mounted() {
      this.initUploader();
    },
    methods: {
      initUploader() {
        console.log(this.$refs.btn);
        this.uploader = new ImageUploader({
          width: 440,
          height: 275,
          toast: this.$message,
          limit: 50000000,
          el: this.$refs.btn.$el
        });

        const el = this.$el.getElementsByTagName("input")[0];
        if (el) {
          console.log(el);
          el.accept = "image/*";
        }

        this.uploader.on("crop", e => {
          this.imageData = e;
        });
      }
    },
    computed: {}
  };
</script>

<style lang="less" rel="stylesheet/less">
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

    .delete-btn {
      position: absolute;
      top: 10px;
      right: 10px;
      font-size: 22px;
    }
  }
</style>
