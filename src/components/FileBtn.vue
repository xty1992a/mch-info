<template>
  <el-button v-bind="props" class="file-btn">
    <span>{{ text }}</span>
    <input type="file" @change="onChange" />
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
    },
    value: String,
    text: String
  },
  data() {
    return {};
  },
  created() {},
  methods: {
    onChange(e) {
      var reader = new FileReader();

      let files = e.target.files || e.dataTransfer.files;
      if (!files.length) return false;
      console.log(files[0].size);

      reader.addEventListener(
        "load",
        () => {
          // 去掉"data:;base64,PGFKLJHFDJSKLJFKL"中"base64,"前面的内容
          // const cert = reader.result.substr(reader.result.indexOf('base64,') + 7)
          this.$emit("input", reader.result);
        },
        false
      );

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
