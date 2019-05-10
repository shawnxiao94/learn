import axios from "axios";
import { getToken, loginOutCas } from "@/common/utils/auth";
import ErrorMessage from "@/common/utils/errorMessage";
import { MessageBox } from "element-ui";
import store from "@/data/store";
import moment from "moment";
const w = window;

let base = "api";
const service = axios.create({
  baseURL: base,
  timeout: 60000
});
service.interceptors.request.use(
  config => {
    // token
    if (getToken()) {
      // && !/10.100.61.148/.test(config.url)
      config.headers["Authorization"] = "Bearer " + getToken();
    }
    config.headers["version"] = "1";
    return config;
  },
  error => {
    Promise.reject(error);
  }
);

service.interceptors.response.use(
  response => {
    if (response.data.ErrorCode !== 0) {
      store.dispatch("AddErrorLog", {
        title: "response.data.ErrorCode 不等于 0",
        message: response.data.ErrorMessage,
        log: {
          api: response.config.url,
          params: response.config.data,
          data: JSON.stringify(response.data) || "{}"
        },
        time: moment(new Date()).format("YYYY-MM-DD HH:mm:ss"),
        url: w.location.hash
      });

      return Promise.reject(response);
    } else if (
      response.data.Result.errCode &&
      response.data.Result.errCode !== 0
    ) {
      store.dispatch("AddErrorLog", {
        title: "response.data.Result.errCode !== 0",
        message: response.data.Result.errMsg,
        log: {
          api: response.config.url,
          params: response.config.data,
          data: JSON.stringify(response.data) || "{}"
        },
        time: moment(new Date()).format("YYYY-MM-DD HH:mm:ss"),
        url: w.location.hash
      });

      return Promise.reject(response);
    } else {
      return Promise.resolve(response);
    }
  },
  error => {
    if (!error.response) {
      // 服务器请求失败时错误提示
      store.dispatch("AddErrorLog", {
        title: "请求超时",
        message: ErrorMessage.API_ERROR_LOAD,
        log: {
          api: error.config.url,
          params: error.config.data,
          data: JSON.stringify(error.data) || "{}"
        },
        time: moment(new Date()).format("YYYY-MM-DD HH:mm:ss"),
        url: w.location.hash
      });
    } else {
      switch (error.response.status) {
        case 400:
          error.message = ErrorMessage.STATUS_400;
          break;
        case 401:
          MessageBox({
            message: "失效，请再次登录！",
            showCancelButton: false,
            confirmButtonText: "确定",
            callback() {
              loginOutCas();
            }
          });
          break;
        case 403:
          error.message = ErrorMessage.STATUS_403;
          break;
        case 404:
          error.message = ErrorMessage.STATUS_404;
          break;
        case 408:
          error.message = ErrorMessage.STATUS_408;
          break;
        case 500:
          error.message = ErrorMessage.STATUS_500;
          break;
        case 501:
          error.message = ErrorMessage.STATUS_501;
          break;
        case 502:
          error.message = ErrorMessage.STATUS_502;
          break;
        case 503:
          error.message = ErrorMessage.STATUS_503;
          break;
        case 504:
          error.message = ErrorMessage.STATUS_504;
          break;
        case 505:
          error.message = ErrorMessage.STATUS_505;
          break;
        default:
      }
      store.dispatch("AddErrorLog", {
        title: "请求失败",
        message: error.message,
        log: {
          api: error.config.url,
          params: error.config.data,
          data: JSON.stringify(error.data) || "{}"
        },
        time: moment(new Date()).format("YYYY-MM-DD HH:mm:ss"),
        url: w.location.hash
      });
    }
    return Promise.reject(error);
  }
);

export default function(url, method, model, params, isPost) {
  let _config = {
    url: url,
    method: method
  };
  let _params = params
    ? model
      ? model.request(JSON.parse(JSON.stringify(params)))
      : params
    : "";
  if (method.toLowerCase() === "post" || isPost) {
    _config.data = _params;
  } else {
    _config.params = _params;
  }
  return new Promise((resolve, reject) => {
    return service(_config)
      .then(response => {
        resolve(model ? model.response(response.data) : response.data);
      })
      .catch(error => {
        reject(error);
      });
  });
}
