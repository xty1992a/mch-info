import * as utils from "../../utils";

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
    searchQuery: null
  },
  mutations: {
    CLEAR_STATE: state => {},
    SET_LIST: (state, list) => (state.list = list),
    SET_SEARCH_QUERY: (state, query) => (state.searchQuery = query),
    SET_LIST_ITEM: (state, item) =>
      (state.list = state.list.map(it => (it.key === item.key ? item : it))),
    DEL_LIST_ITEM: (state, item) =>
      (state.list = state.list.filter(it => it.key !== item.key))
  },
  actions: {
    // 请求新的列表,覆盖state的列表
    async coverList({ commit }, query) {
      console.log("should cover list by ", query);
      commit("SET_SEARCH_QUERY", { ...query });
      await utils.sleep(500);
      commit("SET_LIST", tableData.map(it => ({ ...it, key: Math.random() })));

      return { success: true, data: { total: 20 } };
    },

    // 请求新的列表,追加到state的列表中
    async appendList({ commit, state }, query) {
      // 检查查询参数是否变化
      const change = findChangeProp(query, state.searchQuery || {});
      const indexOnly =
        change.keys.length === 1 && change.keys[0] === "pageIndex";
      if (!change.change) return {};

      console.log("should new list by ", query);
      await utils.sleep(500);
      commit("SET_SEARCH_QUERY", { ...query });
      let list = tableData.map(it => ({ ...it, key: Math.random() }));

      // 只有index变化，追加
      if (indexOnly) {
        list = [...state.list, ...list];
      }
      commit("SET_LIST", list);

      return { success: true, data: { total: 20 } };
    },

    // 请求后端之后,删除列表项目
    async deleteListItem({ commit }, item) {
      await utils.sleep(500);
      commit("DEL_LIST_ITEM", item);
      return true;
    }
  },
  getters: {}
};
