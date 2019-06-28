import Vue from "vue";
import services from "../service";

const { viewImage } = services;

const images = [];

const directives = {
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
