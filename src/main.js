import Vue from "vue";
import "./ui/index";
import router from "./router/index.js";
import store from "./store/index.js";
import App from "./App";
import "./icons/index.js";
import "./styles/index.less";
import storage from "./utils/setStorage";
import "./router/permission.js";
import services from "./service/index";
import * as utils from "./utils";

Vue.config.productionTip = false;

Vue.prototype.$storage = storage;
Vue.prototype.$utils = utils;
Vue.prototype.$services = services;

// 替换图片cdn地址
Vue.filter("img_cdn", v => /^https?/.test(v) ? v : "https://files.1card1.cn/" + v.replace(/^\//, ""));

window.APPLIACTION = new Vue({
  el: "#app",
  router,
  store,
  components: { App },
  render: h => h(App)
});
