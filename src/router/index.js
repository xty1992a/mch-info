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
import { AGENT, MERCHANT, SERVICE } from "./roles";
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
    beforeEnter(to, from, next) {
      if (isMobile) {
        next({ ...to, name: "LogList" });
      } else {
        next({ ...to, name: "LogTable" });
      }
    },
    meta: {
      title: "首页",
      keepAlive: false,
      roles: [AGENT, SERVICE, MERCHANT]
    }
  },
  {
    path: "/LogList",
    name: "LogList",
    beforeEnter(to, from, next) {
      console.log("enter log list ", to.name);
      if (!isMobile) {
        next({ ...to, name: "LogTable" });
      }
      next();
    },
    component: () => import("../views/LogList/List.vue"),
    meta: {
      title: "进件列表",

      keepAlive: false,
      roles: [AGENT, SERVICE, MERCHANT]
    }
  },
  {
    path: "/LogTable",
    name: "LogTable",
    beforeEnter(to, from, next) {
      if (isMobile) {
        next({ ...to, name: "LogList" });
      }
      next();
    },
    component: () => import("../views/LogList/Table.vue"),
    meta: {
      title: "进件记录",

      keepAlive: false,
      roles: [AGENT, SERVICE, MERCHANT]
    }
  },
  {
    path: "/MchInfoAdd",
    name: "MchInfoAdd",
    component: () => import("../views/MchInfoAdd/index.vue"),
    meta: {
      title: "进件",

      keepAlive: false,
      roles: [AGENT, SERVICE, MERCHANT]
    },
    children: [
      {
        path: "Main",
        name: "MchInfoAddMain",
        component: () => import("../views/MchInfoAddSteps/Main.vue"),
        beforeEnter(to, from, next) {
          console.log({ ...from.query }, from.name, { ...to });
          if (
            from.name === "MchInfoAddBase" &&
            from.query.checkPaymentId &&
            !to.query.checkPaymentId
          ) {
            // to.query.checkPaymentId = from.query.checkPaymentId;
            next({
              ...to,
              query: { checkPaymentId: from.query.checkPaymentId }
            });
          }
          next();
        },
        meta: {
          title: "进件-步骤一",

          keepAlive: false,
          roles: [AGENT, SERVICE, MERCHANT]
        }
      },
      {
        path: "Base",
        name: "MchInfoAddBase",
        component: () => import("../views/MchInfoAddSteps/Base.vue"),
        meta: {
          title: "进件-步骤二",

          keepAlive: false,
          roles: [AGENT, SERVICE, MERCHANT]
        }
      },
      {
        path: "Closing",
        name: "MchInfoAddClosing",
        component: () => import("../views/MchInfoAddSteps/Closing.vue"),
        meta: {
          title: "进件-步骤三",

          keepAlive: false,
          roles: [AGENT, SERVICE, MERCHANT]
        }
      },
      {
        path: "Rest",
        name: "MchInfoAddRest",
        component: () => import("../views/MchInfoAddSteps/Rest.vue"),
        meta: {
          title: "进件-步骤四",

          keepAlive: false,
          roles: [AGENT, SERVICE, MERCHANT]
        }
      }
    ]
  },
  {
    path: "/MchInfoDetail",
    name: "MchInfoDetail",
    beforeEnter(to, from, next) {
      console.log({ ...to.query });
      next();
    },
    component: () => import("../views/MchInfoDetail/Main.vue"),
    meta: {
      title: "进件详情",
      keepAlive: false,
      roles: [AGENT, SERVICE, MERCHANT]
    }
  },
  {
    path: "/EditCard",
    name: "EditCard",
    beforeEnter(to, from, next) {
      if (isMobile) {
        next({ ...to, name: "MEditCard" });
      }
      next();
    },
    component: () => import("../views/EditCard/Main.vue"),
    meta: {
      title: "结算信息修改申请",
      keepAlive: false,
      roles: [AGENT, SERVICE, MERCHANT]
    }
  },
  {
    path: "/MEditCard",
    name: "MEditCard",
    beforeEnter(to, from, next) {
      if (!isMobile) {
        next({ ...to, name: "EditCard" });
      }
      next();
    },
    component: () => import("../views/EditCard/Mobile.vue"),
    meta: {
      title: "结算信息修改申请",
      keepAlive: false,
      roles: [AGENT, SERVICE, MERCHANT]
    }
  },
  {
    path: "/PaymentCard",
    name: "PaymentCard",
    beforeEnter(to, from, next) {
      if (isMobile) {
        next({ ...to, name: "MPaymentCard" });
      }
      next();
    },
    component: () => import("../views/PaymentCard/Main.vue"),
    meta: {
      title: "支付方式配置",
      keepAlive: false,
      roles: [AGENT, SERVICE, MERCHANT]
    }
  },
  {
    path: "/MPaymentCard",
    name: "MPaymentCard",
    beforeEnter(to, from, next) {
      if (!isMobile) {
        next({ ...to, name: "PaymentCard" });
      }
      next();
    },
    component: () => import("../views/PaymentCard/Mobile.vue"),
    meta: {
      title: "支付方式配置",
      keepAlive: false,
      roles: [AGENT, SERVICE, MERCHANT]
    }
  },
  {
    path: "/Login",
    name: "Login",
    component: Login,
    meta: {
      title: "登录",
      keepAlive: false,
      free: true
    }
  },
  {
    path: "/Error/NoAuth",
    name: "NoAuth",
    component: () => import("../views/Error/NoAuth/index.vue"),
    meta: {
      free: true,
      title: "无权限"
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
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { x: 0, y: 0 };
    }
  }
});

export default router;
