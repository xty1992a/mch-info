# 进件网站
## 简介
本项目是进件的前端网站,基于Vue和element-ui+vant-ui开发.

使用vue-router实现前端路由,`src/router/permission.js`进行鉴权;

使用vuex管理全局状态,对不同业务划分了不通模块,代码在`src/store`下;

所有请求全部集中到`src/api`统一处理;

页面放置在`src/views`下面,新增页面需要在`src/router/index.js`中注册引入;

弹框类组件提取为函数式服务,集中在`src/services`中,并做代码拆分处理;


## 开始

``` bash
# 下载依赖(cd到项目根目录,即与package.json平级目录)
yarn

# 开启开发服务器
npm run dev

# 打包
npm run build

```
