<template>
  <el-button v-bind="props" class="file-btn">
    <span>点击上传</span>
    <input type="file" @change="onChange">
  </el-button>
</template>

<script>
  export default {
    name: "Title",
    components: {},
    props: {
      props: {
        type: Object,
        default: null
      }
    },
    data() {
      return {};
    },
    created() {
    },
    methods: {
      onChange(e) {
        var reader = new FileReader();

        let files = e.target.files || e.dataTransfer.files;
        if (!files.length) return false;
        console.log(files[0].size);

        reader.addEventListener("load", () => {
          this.$emit("input", reader.result);
        }, false);

        if (files[0]) {
          reader.readAsDataURL(files[0]);
        }
      }
    },
    computed: {}
  };
</script>

<style lang="less" rel="stylesheet/less">

  .file-btn {
    position: relative;

    input {
      opacity: 0;
      position: absolute;
      bottom: 0;
      right: 0;
      top: 0;
      left: 0;
    }
  }
</style>
