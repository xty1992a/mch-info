import * as utils from "../../utils";
import * as API from "@/api";

function findChangeProp(now, old) {
  const keys = [];
  for (let key in now) {
    if (now[key] !== old[key]) {
      keys.push(key);
    }
  }
  return { change: keys.length !== 0, keys };
}

export default {
  namespaced: true,
  state: {
    list: [],
    channelList: [],
    shouldRefresh: true,
    searchQuery: null
  },
  mutations: {
    CLEAR_STATE: state => {
    },
    SET_LIST: (state, list) => (state.list = list),
    SET_SEARCH_QUERY: (state, query) => (state.searchQuery = query),
    SET_CHANNEL_LIST: (state, list) => (state.channelList = list),
    SET_SHOULD_REFRESH: (state, flag) => (state.shouldRefresh = flag),
    SET_LIST_ITEM: (state, item) =>
      (state.list = state.list.map(it => (it.key === item.key ? item : it))),
    DEL_LIST_ITEM: (state, item) => (state.list = state.list.filter(it => it.key !== item.key))
  },
  actions: {
    // 请求新的列表,覆盖state的列表
    async coverList({ commit }, query) {
      commit("SET_SEARCH_QUERY", { ...query });
      const result = await API.getPaymentList({ ...query });
      if (result.success) {
        commit("SET_LIST", result.data.list);
      }
      return result;
      // return { success: true, data: { total: 10 } };
    },

    // 请求新的列表,追加到state的列表中
    async appendList({ commit, state }, { query, shouldCover }) {
      // 检查查询参数是否变化
      const change = findChangeProp(query, state.searchQuery || {});
      const indexOnly = change.keys.length === 1 && change.keys[0] === "pageIndex";
      if (!change.change && !shouldCover) return {};

      console.log("should new list by ", query);
      const result = await API.getPaymentList(query);
      commit("SET_SEARCH_QUERY", { ...query });

      if (!result.success) return result;

      let list = result.data.list;

      // TODO, 是否可以简单的判断pageIndex为1即可覆盖数组?
      // 只有index变化，且pageIndex不为1,追加
      if (indexOnly && query.pageIndex !== 1) {
        list = [...state.list, ...list];
      }
      commit("SET_LIST", list);

      return result;
    },

    // 请求后端之后,删除列表项目
    async deleteListItem({ commit }, id) {
      const result = await API.discardPayment({ checkPaymentId: id });
      return true;
    },

    async getChannelList({ commit, state }) {
      if (state.channelList.length) return state.channelList;
      const res = await API.getChannelList();
      if (res.success) {
        commit("SET_CHANNEL_LIST", res.data.map(it => ({ ...it, label: it.channelName, value: it.id })));
      }
      return state.channelList;
    }
  },
  getters: {}
};
