import Main from "./Main";
import Mobile from "./Mobile";
import Vue from "vue";
import { isMobile } from "@/utils";

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
  startTime: "",
  endTime: "",
  channelId: "",
  list: [],
  isMobile: true,
};

export default (opt = {}) => new Promise(resolve => {
  opt = { ...dftOpt, ...opt, resolve };
  let vm = createVm(opt);
  vm.show = true;
})
