import Vue from "vue";

Vue.config.productionTip = false;
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

Vue.prototype.$storage = storage;
Vue.prototype.$utils = utils;
Vue.prototype.$services = services;

const APP = window.APPLIACTION = new Vue({
  el: "#app",
  router,
  store,
  components: { App },
  render: h => h(App)
});
