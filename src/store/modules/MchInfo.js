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
    currentPage: "",
    routeNames,
    checkPaymentId: 0,
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
    SET_FIRST_FORM: (state, info) => (state.firstForm = info),
    SET_SECOND_FORM: (state, info) => (state.secondForm = info),
    SET_THIRD_FORM: (state, info) => (state.thirdForm = info),
    SET_CHECK_PAYMENT_ID: (state, id) => (state.checkPaymentId = id),
    SET_FORM_FIELDS: (state, fields) => (state.formFields = fields)
  },
  actions: {
    // 提交能力表单,获取checkPaymentId
    async submitAbility({ commit }, data) {
      console.log(data);
      const res = await API.submitAbility(data);
      if (res.success) {
        commit("SET_MAIN_INFO", data);
        console.log(res);
        commit("SET_CHECK_PAYMENT_ID", 1);
      }
      return res.success ? res.data.checkPaymentId : 0;
      // return 1;
    },
    // 根据ID获取表单项,并初始化各页面的formData
    async getFields({ commit }, id) {
      const result = await API.getFormFields(id);
      console.log("get fields ----> ", result.data);
      if (result.success) {
        result.data.secondFields = result.data.secondFields || result.data.firstFields;
        result.data.thirdFields = result.data.thirdFields || result.data.firstFields;

        // 整理后端数据
        const data = Object.keys(result.data).reduce((obj, key) => {
          obj[key] = formatFields(result.data[key]);
          return obj;
        }, {});
        console.log("formated --->", data);
        commit("SET_FORM_FIELDS", data);
      }
      return result.success;
    },

    async cacheFormData({ commit }, { key, data }) {
      console.log("请求中....");
      await sleep(400);
      console.log("请求结束");
      switch (key) {
        case "firstForm":
          commit("SET_FIRST_FORM", data);
          break;
        case "secondForm":
          commit("SET_SECOND_FORM", data);
          break;
        case "thirdForm":
          commit("SET_THIRD_FORM", data);
          break;
      }
    },

    // 初始化表单,如果不存在,则全部初始化为空字符
    async getDefaultFormValue({ commit, state }, id) {
      console.log("should request form data by ", id);
      const fields = state.formFields;
      Object.keys(fields).forEach(key => {
        const formData = fields[key].reduce((p, item) => {
          console.log(item);
          p[item.filedName] = "";
          return p;
        }, {});

        console.log(key, state.formFields[key], formData);
        switch (key) {
          case "firstFields":
            commit("SET_FIRST_FORM", formData);
            break;
          case "secondFields":
            commit("SET_SECOND_FORM", formData);
            break;
          case "thirdFields":
            commit("SET_THIRD_FORM", formData);
            break;
        }
      });
    }
  },
  getters: {
    // 当前步骤
    currentStep: state =>
      routeNames.findIndex(
        it => it.toLowerCase() === state.currentPage.toLowerCase()
      ),
    prevStep: (state, getters) => getters.currentStep - 1,
    prevPage: (state, getters) => routeNames[getters.prevStep] || "",
    nextStep: (state, getters) => getters.currentStep + 1,
    nextPage: (state, getters) => routeNames[getters.nextStep] || "",
    firstFields: state => state.formFields.firstFields || [],
    secondFields: state => state.formFields.secondFields || [],
    thirdFields: state => state.formFields.thirdFields || []
  }
};
