/*
* 应用的全局存储
* 按照模块进行拆分.
*
* 模块应只存储公用数据
* 数据修改的唯一方式是提交mutation,(this.$store.commit(`ModuleName/mutationName`), payload)
* mutation是同步的方式.如果一个修改是需要请求后端的,则应创建一个action方法,action去代发请求,获得结果之后再提交commit去更改数据
*
* */

import Vue from "vue";
import VueX from "vuex";

import App from "./modules/App";
import LogList from "./modules/LogList";
import User from "./modules/User";
import MchInfo from "./modules/MchInfo";

Vue.use(VueX);

export default new VueX.Store({
  modules: {
    // Router,
    LogList,
    MchInfo,
    User,
    App
  }
});
