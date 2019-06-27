/**
 * Created by TY-xie on 2018/5/10.
 */
import request from "./request";
import * as mock from "./mockData";
import { getRegionOption } from "./mock/region";

const mockFn = mock.default;

// 登录,获取用户信息接口
export const login = (data, loading = true) => request({ data, url: "/api/basic/login" }, loading);
// 获取用户信息接口
export const getUserInfo = (data, loading = true) => request({ data, url: "/api/basic/getUserInfo" }, loading);
// 模拟进件表单项接口
export const getBaseFormItems = () => mockFn(mock.formItems);
// 模拟级联接口
export const getRegion = ({ level, value }) => getRegionOption(level, value);
// 提交支付能力,获取进件表单项的标识
export const submitAbility = data => request({ url: "/api/mch/submitAbility", data });
// 获取进件表单项
export const getFormFields = checkPaymentId => request({ url: "/api/mch/getFields", data: { checkPaymentId } });
// 获取商家信息
export const getBusinessInfo = bid => mockFn(mock.businessInfo);
// 获取商家下的门店列表
export const getStoreList = data => request({ url: "/api/basic/getChainStore", data }, false);
// 获取商家列表
export const getMchList = data => request({ url: "/api/basic/getBusiness", data }, false);
// 获取商家的公众号信息
export const getPublicInfo = data => request({ url: "/api/basic/getWechatInfo", data }, false);
// 获取进件信息
export const getMchInfo = checkPaymentId => request({ url: "/api/mch/getMchInfo", data: { checkPaymentId } }, false);
// 暂存进件信息
export const cacheMchInfo = data => request({ url: "/api/mch/storage", data: { ...data, status: 3 } }, false);
// 提交进件信息
export const submitMchInfo = data => request({ url: "/api/mch/storage", data: { ...data, status: 0 } }, false);
// 获取结算卡信息
export const getClearingInfo = data => request({ url: "/api/mch/getClearingInfo", data: { ...data, status: 0 } }, false);

// 获取阿里云上传凭证
export const getOssSignature = data => request({ url: "/api/third/getOssSignature", data }, false);

// 接受一个URL,返回一个级联api接口
export const getLeaveOptions = url => data => request({ url, data }, false);
