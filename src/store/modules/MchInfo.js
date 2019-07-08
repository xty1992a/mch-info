/*
*
* */

import { routes } from "../../router/index";
import * as API from "../../api";
import { sleep } from "@/utils";

// region tools
import { formatFields } from "../utils";
// endregion

const mchInfoRouter = routes.find(it => it.name === "MchInfoAdd");
const stepsRoutes = mchInfoRouter.children;
const routeNames = stepsRoutes.map(it => it.name);

export default {
  namespaced: true,
  state: {
    routeNames,
    currentPage: "",
    checkPaymentId: 0,
    mchInfo: null,
    mainInfo: null, // 缓存的支付能力表单
    formFields: {
      firstFields: [],
      secondFields: [],
      thirdFields: []
    },
    firstForm: null,
    secondForm: null,
    thirdForm: null
  },
  mutations: {
    CLEAR_STATE: state => {
      state.currentPage = "";
      state.checkPaymentId = 0;
      state.mainInfo = null;
      state.mchInfo = null;
      state.firstForm = null;
      state.secondForm = null;
      state.thirdForm = null;
      state.formFields = {
        firstFields: [],
        secondFields: [],
        thirdFields: []
      };
    },
    // 当前路由
    SET_CURRENT_PAGE: (state, name) => (state.currentPage = name),
    SET_MAIN_INFO: (state, info) => (state.mainInfo = info),
    SYNC_MAIN_INFO: (state, model) => {
      const mchInfo = state.mchInfo || {};
      Object.keys(model).forEach(key => {
        model[key] = mchInfo[key] || "";
      });

      state.mainInfo = model;
    },
    SET_FIRST_FORM: (state, info) => (state.firstForm = info),
    SET_SECOND_FORM: (state, info) => (state.secondForm = info),
    SET_THIRD_FORM: (state, info) => (state.thirdForm = info),
    SET_CHECK_PAYMENT_ID: (state, id) => (state.checkPaymentId = +id),
    SET_FORM_FIELDS: (state, fields) => (state.formFields = fields),
    SET_MCH_INFO: (state, data) => (state.mchInfo = data),
    SYNC_MCH_INFO: (state, model) => { // 同步数据
      console.log({ ...model }, "before sync ");
      const mchInfo = { ...state.mchInfo };
      Object.keys(model).forEach(key => {
        mchInfo[key] = typeof model[key] !== "undefined" ? model[key] : mchInfo[key];
      });
      console.log({ ...mchInfo }, "after sync ");
      state.mchInfo = mchInfo;
    }
  },
  actions: {
    // 提交支付能力信息,获取checkPaymentId
    async submitAbility({ commit }, data) {
      const res = await API.submitAbility(data);
      if (res.success) {
        commit("SET_MAIN_INFO", data);
        commit("SET_CHECK_PAYMENT_ID", res.data.checkPaymentId);
      }
      return res.success ? res.data.checkPaymentId : 0;
    },
    // 根据ID获取表单项,并将其整理为前端可用的数据格式
    async getFields({ commit, state }, id) {
      console.log("getFields", id, state.checkPaymentId);
      if (state.formFields.firstFields.length) {
        if (state.checkPaymentId === id) {
          return true;
        }
      }
      const result = await API.getFormFields(id);
      if (result.success) {
        const data = Object.keys(result.data).reduce((obj, key) => ({ ...obj, [key]: formatFields(result.data[key], id) }), {});
        console.log("formatted  --->", data);
        commit("SET_FORM_FIELDS", data);
      }
      return result.success;
    },

    // 将页面数据同步到后端
    async cacheMchInfo({ commit, state }, model) {
      const mchInfo = { ...state.mchInfo };
      Object.keys(model).forEach(key => {
        mchInfo[key] = model[key] || mchInfo[key];
      });
      const result = await API.cacheMchInfo({ ...mchInfo, checkPaymentId: state.checkPaymentId });
      if (!result.success) return;
      commit("SET_MCH_INFO", mchInfo);
      return true;
    },
    // 获取表单数据
    async getMchInfo({ commit, state }, id) {
      console.log("get mch info ", id, state.checkPaymentId);
      if (state.mchInfo) {
        if (+state.checkPaymentId === +id) {
          return true;
        }
      }
      const result = await API.getMchInfo(id);
      if (result.success) {
        Object.keys(result.data).forEach(key => {
          let value = result.data[key];
          value = typeof value === "number" ? value : (value + "").replace(/null/g, "");
          result.data[key] = value;
        });
        commit("SET_MCH_INFO", result.data);
      }
    },
  },
  getters: {
    // 当前步骤
    currentStep: state => routeNames.findIndex(it => it.toLowerCase() === state.currentPage.toLowerCase()),
    prevStep: (state, getters) => getters.currentStep - 1,
    prevPage: (state, getters) => routeNames[getters.prevStep] || "",
    nextStep: (state, getters) => getters.currentStep + 1,
    nextPage: (state, getters) => routeNames[getters.nextStep] || "",

    firstFields: state => state.formFields.firstFields || [],
    secondFields: state => state.formFields.secondFields || [],
    thirdFields: state => state.formFields.thirdFields || [],

    firstFieldKeys: state => state.formFields.firstFields.reduce((p, it) => [...p, it.filedName], []),
    secondFieldKeys: state => state.formFields.secondFields.reduce((p, it) => [...p, it.filedName], []),
    thirdFieldKeys: state => state.formFields.thirdFields.reduce((p, it) => [...p, it.filedName], []),
  }
};
