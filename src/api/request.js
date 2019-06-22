import axios from "axios";
import { Loading, Message } from "element-ui";
import { Toast } from "vant";
import { isMobile } from "@/utils";

// region tools
const callLoading = loading => {
  if (!loading) return;
  return isMobile
    ? Toast.loading({ message: "加载中...", duration: 0, mask: true })
    : Loading.service({});
};

const clearLoading = loading => {
  if (!loading) return;
  return isMobile ? Toast.clear() : Loading.service({}).close();
};

const callToast = (opt, toast) => {
  if (!toast) return;
  return isMobile ? Toast.fail(opt.message) : Message(opt);
};
// endregion

// region 拦截器
// 添加响应拦截器
axios.interceptors.response.use(
  function(response) {
    // 对响应数据做点什么
    if (typeof response.data.data === "string") {
      try {
        response.data.data = JSON.parse(response.data.data);
      } catch (e) {
        console.log("not json type");
      }
    }

    return response;
  },
  function(error) {
    // 对响应错误做点什么
    console.log("响应错误");
    return Promise.reject(error);
  }
);

// endregion

export default function request(
  { method = "POST", data = {}, url, headers = {} },
  loading = true,
  toast = true
) {
  callLoading(loading);
  return new Promise(resolve => {
    const params = data.params || null;
    delete data.params;

    console.log(data);
    axios({
      method,
      url,
      data,
      params,
      headers,
      timeout: 5000
    })
      .then(res => {
        clearLoading(loading);
        if (!res.data.success) {
          callToast(
            {
              type: "waring",
              message: res.data.message || "服务异常"
            },
            toast
          );
        }

        resolve(res.data);
      })
      .catch(err => {
        clearLoading(loading);
        console.log(err, "net error");
        callToast(
          {
            type: "error",
            message: "网络故障"
          },
          toast
        );
        resolve({
          success: false,
          message: "网络故障",
          data: err
        });
      });
  });
}
