import * as API from "@/api";
import ImageUploader from "@redbuck/image-uploader";
import "@redbuck/image-uploader/lib/imageUploader.css";

export default {
  async mounted() {
    this._uploadUrl = "https://files.1card1.cn";
    // const res = await API.getOssSignature();
    // if (res.success) {
    //   this._uploadUrl = res.data.url;
    // }
    // console.log(res);
    this.initUploader();
  },
  methods: {
    initUploader() {
      this.uploader = new ImageUploader({
        width: 880,
        height: 550,
        toast: this.$message,
        limit: 50000000,
        fileName: "file",
        el: this.$refs.btn.$el,
        uploadUrl: this._uploadUrl,
        async getFormDataAsync(callback) {
          const res = await API.getOssSignature();
          if (res.success) {
            callback({
              OSSAccessKeyId: res.data.accessId,
              policy: res.data.policy,
              signature: res.data.signature,
              key: res.data.key,
              success_action_status: "200"
            });
          }
          else {
            callback(null);
          }
        }
      });

      const el = this.$el.getElementsByTagName("input")[0];
      if (el) {
        console.log(el);
        el.accept = "image/*";
      }

      this.uploader.on("upload", e => {
        console.log("upload", e.formData.key);
        this.$emit("input", e.formData.key);
      });
    }
  },
};
