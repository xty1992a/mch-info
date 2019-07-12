import axios from "axios";

function request(url) {
  return new Promise(resolve => {
    if (url === "http://files.1card1.cn") {
      resolve(null);
      return;
    }
    axios
      .get(url + "?x-oss-process=image/info")
      .then(res => {
        resolve(res.data);
      })
      .catch(() => {
        resolve(null);
      });
  });
}

export default {
  data() {},
  methods: {
    // 参数为阿里云OSS图片链接数组
    async initImagePreview(imgList) {
      if (!Array.isArray(imgList)) {
        console.warn("参数为阿里云OSS图片链接数组");
        return;
      }
      this.imgInfoList = await this.getInfoList(imgList);
      return true;
    },

    // 参数为被点击的图片,或者点击图片事件
    viewImage(e) {
      let el = e;
      if (e instanceof Event) {
        el = e.target;
      }
      if (!el instanceof Element) {
        console.warn("arg must be Element");
        return;
      }
      if (el.tagName.toLowerCase() !== "img") {
        console.warn("arg must be ImgElement");
        return;
      }
      if (!this.imgInfoList || !this.imgInfoList.length) {
        console.warn("请先调用initImagePreview");
        return;
      }
      this.$services.viewImage({
        items: this.imgInfoList,
        triggerEl: el
      });
    },

    async getInfoList(list) {
      let results = [];
      while (list.length) {
        let url = this.$utils.img_cdn(list.shift());
        let title = this.getTitleByUrl ? this.getTitleByUrl(url) : "";
        const result = await request(url);
        if (!result) continue;
        results.push({
          title,
          src: url,
          w: +result.ImageWidth.value,
          h: +result.ImageHeight.value
        });
      }
      console.log(results);
      return results;
    }
  }
};
