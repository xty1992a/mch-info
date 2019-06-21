import * as utils from "../../utils";

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
  }
];

export default {
  namespaced: true,
  state: {
    list: []
  },
  mutations: {
    CLEAR_STATE: state => {
    },
    SET_LIST: (state, list) => state.list = list,
    SET_LIST_ITEM: (state, item) => state.list = state.list.map(it => it.key === item.key ? item : it),
    DEL_LIST_ITEM: (state, item) => state.list = state.list.filter(it => it.key !== item.key)
  },
  actions: {
    // 请求新的列表,覆盖state的列表
    async coverList({ commit }, query) {
      await utils.sleep(500);
      commit("SET_LIST", tableData);
    },

    // 请求新的列表,追加到state的列表中
    async appendList({ commit, state }, query) {
      await utils.sleep(500);
      const list = [...state.list, ...tableData];
      commit("SET_LIST", list);
    },

    // 请求后端之后,删除列表项目
    async deleteListItem({ commit }, item) {
      await utils.sleep(500);
      commit("DEL_LIST_ITEM", item);
    }

  },
  getters: {}
};
