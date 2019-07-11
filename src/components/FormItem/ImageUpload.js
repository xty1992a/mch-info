import * as API from "@/api";
import ImageUploader from "@redbuck/image-uploader";
import "@redbuck/image-uploader/lib/imageUploader.css";
import { Toast } from "vant";

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
    clear() {
      this.$emit("input", "");
    },
    initUploader() {
      let l;
      this.uploader = new ImageUploader({
        width: 1200,
        height: 900,
        MIME: "image/jpeg",
        toast: this.$message,
        limit: 50000000,
        fileName: "file",
        el: this.$refs.btn.$el,
        uploadUrl: this._uploadUrl,
        async getFormDataAsync(callback) {
          const res = await API.getOssSignature();
          if (res.success) {
            l = Toast.loading({
              mask: true,
              message: "上传中...",
              duration: 0
            });
            callback({
              OSSAccessKeyId: res.data.accessId,
              policy: res.data.policy,
              signature: res.data.signature,
              key: res.data.key,
              success_action_status: "200"
            });
          } else {
            callback(null);
          }
        }
      });

      const el = this.$el.getElementsByTagName("input")[0];
      if (el) {
        el.accept = "image/*";
      }

      this.uploader.on("upload-error", e => {
        this.uploader.insertBtn.value = null;
        l && l.clear();
      });

      this.uploader.on("cropper-created", cropper => {
        console.log(cropper);
        setTimeout(() => {
          // cropper.rotate(90);
        }, 30);
      });

      this.uploader.on("upload", e => {
        this.uploader.insertBtn.value = null;
        console.log("upload", e.formData.key);
        this.$emit("input", "/" + e.formData.key);
        l && l.clear();
      });
    }
  }
};
