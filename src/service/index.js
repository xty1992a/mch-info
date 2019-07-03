/*
* 异步弹窗服务,模块的方法不带参数调用时,将会异步加载模块,并将其默认暴露返回,不会调用
* 因此,需要预先加载模块时,可以不带参数调用一次.使模块到位,优化体验
*
* 带参数调用时,返回模块默认暴露的方法的返回值
* */

import { Toast } from "vant";
// 所有模块必须手写
// import()不支持动态传参,因为打包框架必须明确知道模块,预先拆分
export default {
  linkPick: async (option) => {
    try {
      const module = await import("./LinkPicker/index.js");
      if (!option) return module.default;
      return module.default(option);
    } catch (e) {
      Toast.fail("加载模块失败!");
      return { success: false };
    }
  },
  datePick: async (option) => {
    try {
      const module = await import("./DatePicker/index.js");
      if (!option) return module.default;
      return module.default(option);
    } catch (e) {
      Toast.fail("加载模块失败!");
      return { success: false };
    }
  },
  pickDateRange: async (option) => {
    try {
      const module = await import("./DownloadPicker/index.js");
      if (!option) return module.default;
      return module.default(option);
    } catch (e) {
      Toast.fail("加载模块失败!");
      return { success: false };
    }
  },
  pickItem: async (option) => {
    try {
      const module = await import("./Picker/index.js");
      if (!option) return module.default;
      return module.default(option);
    } catch (e) {
      Toast.fail("加载模块失败!");
      return { success: false };
    }
  },
  editFee: async (option) => {
    try {
      const module = await import("./FeeEditor/index.js");
      if (!option) return module.default;
      return module.default(option);
    } catch (e) {
      Toast.fail("加载模块失败!");
      return { success: false };
    }
  },
  filterQuery: async (option) => {
    try {
      const module = await import("./LogFilter/index.js");
      if (!option) return module.default;
      return module.default(option);
    } catch (e) {
      console.log(e);
      Toast.fail("加载模块失败!");
      return { success: false };
    }
  },
  pickItemAsync: async (option) => {
    try {
      const module = await import("./PagingPicker/index.js");
      if (!option) return module.default;
      return module.default(option);
    } catch (e) {
      console.log(e);
      Toast.fail("加载模块失败!");
      return { success: false };
    }
  },
  viewImage: async (option) => {
    try {
      const module = await import("./ImageViewer/index.js");
      if (!option) return module.default;
      return module.default(option);
    } catch (e) {
      console.log(e);
      Toast.fail("加载模块失败!");
      return { success: false };
    }
  },
};
