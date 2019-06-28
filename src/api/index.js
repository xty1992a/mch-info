/**
 * Created by TY-xie on 2018/5/10.
 */
import request from "./request";
import * as mock from "./mockData";
import { getRegionOption } from "./mock/region";

const mockFn = mock.default;

// 登录,会获得登录cookie标识
export const login = (data, loading = true) => request({ data, url: "/api/basic/login" }, loading);
// 获取用户信息接口
export const getUserInfo = (data, loading = true) => request({ data, url: "/api/basic/getUserInfo" }, loading);
// 提交支付能力,获取进件标识 checkPaymentId
export const submitAbility = data => request({ url: "/api/mch/submitAbility", data });
// 获取进件表单项
export const getFormFields = checkPaymentId => request({ url: "/api/mch/getFields", data: { checkPaymentId } });
// 获取商家下的门店列表
export const getStoreList = data => request({ url: "/api/basic/getChainStore", data }, false);
// 获取重新进件时需要的进件通道
export const getChannelList = data => request({ url: "/api/mch/getChannels", data }, false);
// 获取商家列表
export const getMchList = data => request({ url: "/api/basic/getBusiness", data }, false);
// 获取商家的公众号信息
export const getPublicInfo = data => request({ url: "/api/basic/getWechatInfo", data }, false);
// 获取进件信息
export const getMchInfo = checkPaymentId => request({ url: "/api/mch/getMchInfo", data: { checkPaymentId } }, false);
// 暂存进件信息
export const cacheMchInfo = data => request({ url: "/api/mch/storage", data: { ...data, status: 3 } }, true);
// 提交进件信息
export const submitMchInfo = data => request({ url: "/api/mch/storage", data: { ...data, status: 0 } }, false);
// 获取结算卡信息
export const getClearingInfo = checkPaymentId => request({ url: "/api/mch/getClearingInfo", data: { checkPaymentId } }, false);
// 弃用进件记录
export const delMchInfo = checkPaymentId => request({ url: "/api/mch/discardCheckPayment", data: { checkPaymentId } }, true);
// 重新进件
export const recheckPayment = data => request({ url: "/api/mch/repeatCheckPayment", data }, true);

// 获取阿里云上传凭证
export const getOssSignature = data => request({ url: "/api/third/getOssSignature", data }, false);

// 接受一个URL,返回一个级联api接口
export const getLeaveOptions = url => data => request({ url, data }, false);
