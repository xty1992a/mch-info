import Cookie from "js-cookie";
import * as API from "@/api";

const mockData = {
  token: "admin",
  role: "admin"
};

export default {
  namespaced: true,
  state: {
    authList: [], // 允许访问的一维路由表
    userInfo: null, // 用户信息，登陆即应获取
    publicInfo: null, // 公众号信息，进入进件页面获取
    businessInfo: null // 商家信息，进入进件页面获取
  },
  mutations: {
    CLEAR_STATE: state => {
      state.authList = [];
      state.userInfo = null;
      state.publicInfo = null;
      state.businessInfo = null;
    },
    SET_AUTH_LIST: (state, list) => (state.authList = list),
    SET_USER_INFO: (state, info) => (state.userInfo = info),
    SET_PUBLIC_INFO: (state, info) => (state.publicInfo = info),
    SET_BUSINESS_INFO: (state, info) => (state.businessInfo = info)
  },
  actions: {
    // 调登陆接口，后端将写入一个cookie
    async LoginByUsername({ commit }, params) {
      const res = { success: true, data: { token: "asdf" } };
      if (res.success) {
        Cookie.set("user", res.data.token, { expires: 0.5 });
      }
      return res;
    },
    // 获取用户信息
    async getUserInfo({ commit, state }) {
      if (state.userInfo) return { success: true, data: state.userInfo };
      // let res = await API.getUser();
      const res = { success: true, data: mockData };
      if (res.success) {
        commit("SET_USER_INFO", res.data);
      }
      return res;
    },

    // 获取商户信息，包括公众号和商家信息
    async fetchMchInfo({ commit }, businessId) {
      const [pInfo, bInfo] = await Promise.all([
        API.getPublicInfo(businessId),
        API.getBusinessInfo(businessId)
      ]);

      if (!pInfo.success || !bInfo.success) return false;
      commit("SET_PUBLIC_INFO", pInfo.data);
      commit("SET_BUSINESS_INFO", bInfo.data);

      return true;
    },

    // 登出，清除所有vuex数据
    Logout({ commit }) {
      return new Promise(resolve => {
        Cookie.remove("user");
        commit("User/CLEAR_STATE", null, { root: true });
        commit("Router/CLEAR_STATE", null, { root: true });
        commit("App/CLEAR_STATE", null, { root: true });
        resolve();
      });
    }
  },
  getters: {}
};
