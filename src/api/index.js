/**
 * Created by TY-xie on 2018/5/10.
 */
import request from "./request";
import * as mock from "./mockData";
import { getRegionOption } from "./mock/region";

const mockFn = mock.default;

// 登录,获取用户信息接口
export const login = (data, loading = true) =>
  request({ data, url: "/api/Login/UserLogin" }, loading);

export const getBaseFormItems = () => mockFn(mock.formItems);

export const getRegion = ({ level, value }) => getRegionOption(level, value);

export const submitAbility = data =>
  request({ url: "/api/mch/submitAbility", data });

export const getFormFields = checkPaymentId =>
  request({ url: "/api/mch/getFields", data: { checkPaymentId } });

export const getBusinessInfo = bid => mockFn(mock.businessInfo);
export const getPublicInfo = bid => mockFn(mock.publicInfo);
