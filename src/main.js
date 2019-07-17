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
import Directives from "./utils/directives";
import * as ROLES from "@/router/roles";
import dayjs from "dayjs";

Vue.config.productionTip = false;

Vue.prototype.DEVELOPMENT = process.env.NODE_ENV === "development";
Vue.prototype.$storage = storage;
Vue.prototype.$utils = utils;
Vue.prototype.$dayjs = dayjs;
Vue.prototype.$services = services;
Vue.use(Directives);
Vue.prototype.$roles = ROLES;

// Vue.prototype.$role = role => {
//   const userRole = store.state.User.userInfo.role
//   let list = role
//   if (typeof role === 'string') {
//     list = [role]
//   }
//   if (!list.includes( store.state.User.userInfo.role)) {
//     el.style.display = "none";
//   }
// }

// 替换图片cdn地址
Vue.filter("img_cdn", utils.img_cdn);

window.APPLIACTION = new Vue({
  el: "#app",
  router,
  store,
  components: { App },
  render: h => h(App)
});
