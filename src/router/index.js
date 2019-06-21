/*
* 路由页面拆分为异步组件.减少首页加载体积
* 路由对象的meta中,储存该页面基本信息
* 其中roles字段表示可访问该页面的用户角色
* 路由跳转时,将检查用户角色是否命中该字段
* */

import Vue from "vue";
import Router from "vue-router";
import NotFound from "@/views/Error/NotFound";
import Login from "@/views/Login";
import { ADMIN, MERCHANT, SERVICE } from "./roles";
import { isMobile } from "../utils";

Vue.use(Router);

export const routes = [
  {
    path: "/",
    redirect: "/Home",
    name: "Root",
    meta: {
      title: "根页面",
      free: true
    }
  },
  {
    path: "/Home",
    name: "Home",
    beforeEnter(from, to, next) {
      if (isMobile) {
        next({ ...to, name: "LogList" });
      }
      else {
        next({ ...to, name: "LogTable" });
      }
    },
    meta: {
      isSide: false, isTag: false, title: "首页", icon: "", roles: [ADMIN, SERVICE, MERCHANT]
    }
  },
  {
    path: "/LogList",
    name: "LogList",
    component: () => import("../views/LogList/List.vue"),
    meta: {
      isSide: false, isTag: false, title: "进件列表", icon: "", roles: [ADMIN, SERVICE, MERCHANT]
    }
  },
  {
    path: "/LogTable",
    name: "LogTable",
    component: () => import("../views/LogList/Table.vue"),
    meta: {
      isSide: false, isTag: false, title: "进件记录", icon: "", roles: [ADMIN, SERVICE, MERCHANT]
    }
  },
  {
    path: "/MchInfoAdd",
    name: "MchInfoAdd",
    component: () => import("../views/MchInfoAdd/index.vue"),
    meta: {
      isSide: false, isTag: false, title: "进件", icon: "", roles: [ADMIN, SERVICE, MERCHANT]
    },
    children: [
      {
        path: "Main",
        name: "MchInfoAddMain",
        component: () => import("../views/MchInfoAddSteps/Main.vue"),
        meta: {
          isSide: false, isTag: false, title: "进件-步骤一", icon: "", roles: [ADMIN, SERVICE, MERCHANT]
        }
      },
      {
        path: "Base",
        name: "MchInfoAddBase",
        component: () => import("../views/MchInfoAddSteps/Base.vue"),
        meta: {
          isSide: false, isTag: false, title: "进件-步骤二", icon: "", roles: [ADMIN, SERVICE, MERCHANT]
        }
      },
      {
        path: "Closing",
        name: "MchInfoAddClosing",
        component: () => import("../views/MchInfoAddSteps/Closing.vue"),
        meta: {
          isSide: false, isTag: false, title: "进件-步骤三", icon: "", roles: [ADMIN, SERVICE, MERCHANT]
        }
      },
      {
        path: "Rest",
        name: "MchInfoAddRest",
        component: () => import("../views/MchInfoAddSteps/Rest.vue"),
        meta: {
          isSide: false, isTag: false, title: "进件-步骤四", icon: "", roles: [ADMIN, SERVICE, MERCHANT]
        }
      }
    ]
  },
  {
    path: "/Login",
    name: "Login",
    component: Login,
    meta: {
      isSide: false, isTag: false, title: "登录", icon: "", free: true
    }
  },
  {
    path: "*",
    name: "NotFound",
    meta: { free: true, title: "404" },
    component: NotFound
  }
];

const router = new Router({
  routes
});

export default router;
