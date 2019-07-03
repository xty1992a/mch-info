import Vue from "vue";
import store from "@/store";
import services from "../service";

const { viewImage } = services;

const images = [];

const directives = {
  role: {
    bind: function(el, binding) {
      let list = binding.value;
      if (typeof binding.value === "string") {
        list = [binding.value];
      }
      if (!list.includes(store.state.User.userInfo.role)) {
        el.style.display = "none";
      }
    }
  },
  // preview: {
  //   bind: function(el, binding) {
  //     console.log(binding, this);
  //     if (binding.value) return;
  //     const imgs = el.getElementsByTagName("img");
  //     console.log(imgs);
  //     images.push(...imgs);
  //     el.addEventListener("click", function() {
  //     });
  //   },
  //   update: function(el, value) {
  //     console.log(value, images);
  //
  //   },
  //   unbind: function(el, binding) {
  //
  //   }
  // }
};

export default {
  install(Vue) {
    Object.keys(directives).forEach(key => {
      Vue.directive(key, directives[key]);
    });
  }
};
