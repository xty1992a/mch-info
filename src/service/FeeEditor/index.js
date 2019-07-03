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
  checkPaymentId: 0,
  options: [
    {
      "text": "0.3%",
      "value": "0.003"
    },
    {
      "text": "0.35%",
      "value": "0.0035"
    },
    {
      "text": "0.38%",
      "value": "0.0038"
    },
    {
      "text": "0.4%",
      "value": "0.004"
    },
    {
      "text": "0.45%",
      "value": "0.0045"
    },
    {
      "text": "0.5%",
      "value": "0.005"
    },
    {
      "text": "0.55%",
      "value": "0.0055"
    },
    {
      "text": "0.6%",
      "value": "0.006"
    }
  ]
};

export default (opt = {}) => new Promise(resolve => {
  opt = { ...dftOpt, ...opt, resolve, };
  let vm = createVm(opt);
  vm.show = true;
})
