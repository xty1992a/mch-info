import Main from "./Main";
import Mobile from "./Mobile";
import { isMobile } from "../../utils";
import Vue from "vue";

const copy = o => JSON.parse(JSON.stringify(o));

function createVm(opt) {
  let Com;
  if (isMobile) {
    Com = Vue.extend(Mobile);
  }
  else {
    Com = Vue.extend(Main);
  }

  const vm = new Com({ data: opt }).$mount();
  document.body.appendChild(vm.$el);
  return vm;
}

const dftOpt = {
  value: "",
  options: []
};

export default (opt = {}) => new Promise(resolve => {
  opt = { ...dftOpt, ...opt, resolve, value: copy(opt.value) };
  let vm = createVm(opt);
  vm.show = true;
})
