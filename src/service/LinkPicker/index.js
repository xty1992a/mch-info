import Main from "./Main";
import Vue from "vue";

const Com = Vue.extend(Main);
const copy = o => JSON.parse(JSON.stringify(o));

function createVm(opt) {
  const vm = new Com({ data: opt }).$mount();
  document.body.appendChild(vm.$el);
  return vm;
}

const dftOpt = {
  value: String,
  isMobile: true,
  title: "请选择",
  data: Object,
  props: {
    value: "value",
    label: "label"
  }
};

export default (opt = {}) => new Promise(resolve => {
  opt = { ...dftOpt, ...opt, resolve, value: copy(opt.value) };
  let vm = createVm(opt);
  vm.show = true;
})
