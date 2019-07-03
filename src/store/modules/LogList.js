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

const tableData = [
  {
    date: "2016-05-02",
    name: "王小虎",
    key: "1",
    address: "上海市普陀区金沙江路 1518 弄"
  },
  {
    date: "2016-05-04",
    name: "王小虎",
    key: "2",
    address: "上海市普陀区金沙江路 1517 弄"
  },
  {
    date: "2016-05-01",
    name: "王小虎",
    key: "3",
    address: "上海市普陀区金沙江路 1519 弄"
  },
  {
    date: "2016-05-03",
    name: "王小虎",
    key: "4",
    address: "上海市普陀区金沙江路 1516 弄"
  },
  {
    date: "2016-05-03",
    name: "王小虎",
    key: "4",
    address: "上海市普陀区金沙江路 1516 弄"
  },
  {
    date: "2016-05-03",
    name: "王小虎",
    key: "4",
    address: "上海市普陀区金沙江路 1516 弄"
  },
  {
    date: "2016-05-03",
    name: "王小虎",
    key: "4",
    address: "上海市普陀区金沙江路 1516 弄"
  },
  {
    date: "2016-05-03",
    name: "王小虎",
    key: "4",
    address: "上海市普陀区金沙江路 1516 弄"
  },
  {
    date: "2016-05-03",
    name: "王小虎",
    key: "4",
    address: "上海市普陀区金沙江路 1516 弄"
  },
  {
    date: "2016-05-03",
    name: "王小虎",
    key: "4",
    address: "上海市普陀区金沙江路 1516 弄"
  }
];

export default {
  namespaced: true,
  state: {
    list: [],
    channelList: [],
    searchQuery: null
  },
  mutations: {
    CLEAR_STATE: state => {
    },
    SET_LIST: (state, list) => (state.list = list),
    SET_SEARCH_QUERY: (state, query) => (state.searchQuery = query),
    SET_CHANNEL_LIST: (state, list) => (state.channelList = list),
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
    async appendList({ commit, state }, query) {
      // 检查查询参数是否变化
      const change = findChangeProp(query, state.searchQuery || {});
      const indexOnly =
        change.keys.length === 1 && change.keys[0] === "pageIndex";
      if (!change.change) return {};

      console.log("should new list by ", query);
      const result = await API.getPaymentList(query);
      commit("SET_SEARCH_QUERY", { ...query });

      if (!result.success) return result;

      let list = result.data.list;

      // 只有index变化，追加
      if (indexOnly) {
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
