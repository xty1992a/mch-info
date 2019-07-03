/*
 * 使用vue-router的全局路由进行鉴权
 * 每次跳转前,检查将前往的路由是否在用户可访问的路由表中
 * 是则放行,否则拦截到错误页
 * */

import router, { routes } from "./index";
import { isLogin, logOut } from "../utils/auth";
import store from "../store";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import * as ROLES from "./roles";

const LOG_STYLE = "background:#222;padding:0 10px 0 100px;color:#bada55";

// 将树形路由对象转为一维的name数组
const names = getName(routes);

// region 利用全局守卫鉴权
router.beforeEach(async (to, from, next) => {
  NProgress.start();
  document.title = to.meta.title || "进件";
  const log = (...args) =>
    console.log(`%c path to ${to.path}`, LOG_STYLE, ...args);
  const loged = isLogin();

  // region 自由页面直接放过
  if (to.meta.free) {
    log("free");
    // 已登录前往登录的,重定向首页
    if ((to.path.toLowerCase() === "/login" || to.path.toLowerCase() === "/adminlogin") && loged) {
      log("go to login");
      next({ name: "Root" });
      return;
    }

    next();
    return;
  }
  // endregion

  // region 未登录重定向登录页
  if (!loged) {
    log(`you should login before visit this page!`);
    const path = getLoginPath();
    next(`${path}?redirect_url=${to.fullPath}`);
    return;
  }
  // endregion

  // region 拉取用户信息并生成路由表
  if (!store.state.User.userInfo) {
    log("no user info");
    // 先拉取用户信息,获取角色
    let userResult = await store.dispatch("User/getUserInfo");
    // 获取用户信息失败，可能是cookie已失效，重新登陆
    console.log(userResult);
    if (!userResult.success || userResult.data.role === ROLES.NONE) {
      logOut();
      log("fetch userInfo fail; should login again");
      // next(`/Login?redirect_url=${to.fullPath}`);
      next({ name: "Home" });
      return;
    }
    setLoginPath(userResult.data.role);
    // 根据用户角色生成路由表
    const authList = genAuthList(
      routes,
      it => it.meta.free || it.meta.roles.includes(userResult.data.role)
    );
    store.commit("User/SET_AUTH_LIST", getName(authList));
  }
  // endregion

  // 用户可访问的路由表
  const { authList } = store.state.User;

  // 前往没有权限且存在的路由，拦截到无权限页面
  if (!authList.includes(to.name) && names.includes(to.name)) {
    next("/Error/NoAuth");
    return;
  }

  if (!to.name) {
    next({ name: "Home" });
  }

  // 正常访问(包括乱码,导去404)
  next();
});
// endregion

router.afterEach(() => {
  NProgress.done();
});

// region tools
// 递归收集所有路由的name
function getName(list) {
  return list.reduce((p, it) => {
    let children = [];
    if (it.children) {
      children = getName(it.children);
    }
    return [...p, it.name, ...children];
  }, []);
}

// 递归过滤路由中符合条件的项目
function genAuthList(list, check) {
  return list.reduce((p, it) => {
    let children = [];
    if (it.children) {
      children = genAuthList(it.children, check);
    }
    return check(it) ? [...p, it, ...children] : p;
  }, []);
}

// 用户不同,登录页面不同
// 商家不能登录,代理商 /login 管理员是/AdminLogin
function setLoginPath(role) {
  switch (role) {
    case ROLES.MERCHANT:
      localStorage.setItem("USER_LOGIN_PATH", "/Error/NoAuth");
      break;
    case ROLES.SERVICE:
      localStorage.setItem("USER_LOGIN_PATH", "/AdminLogin");
      break;
    default:
      localStorage.setItem("USER_LOGIN_PATH", "/Login");
  }
}

function getLoginPath() {
  const path = localStorage.getItem("USER_LOGIN_PATH");
  return path || "/Login";
}

// endregion
