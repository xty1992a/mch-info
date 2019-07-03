import Main from "./Main";
import Mobile from "./Mobile";
import { isMobile, sleep } from "../../utils";
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
  title: "请选择",
  key: "pagingPicker__data",
  shouldCache: false,
  placeholder: "请输入商家账号/门店名称",
  columns: [],
  total: 0,
  searchable: true,
  paging: true,
  props: {
    key: "key",
    title: "title"
  },
  request: async query => {
    await sleep(100);
    return { success: true, data: [] };
  }
};

export default (opt = {}) =>
  new Promise(resolve => {
    console.log(opt);
    opt = { ...dftOpt, ...opt, resolve, value: copy(opt.value) };
    let vm = createVm(opt);
    vm.show = true;
  });
