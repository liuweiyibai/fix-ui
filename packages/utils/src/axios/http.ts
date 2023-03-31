import axios, {
  AxiosInstance,
  AxiosInterceptorManager,
  CreateAxiosDefaults,
  InternalAxiosRequestConfig,
} from 'axios';
import Axios, { AxiosResponse, AxiosRequestConfig, AxiosError } from 'axios';
import {
  ApiResponse,
  ReqInterceptorFunc,
  TypeSetupAxiosRequestParams,
} from './types';
import { toast } from 'vue3-toastify';
import { SStorage, Storage } from '../storage';

let axiosInstance: AxiosInstance;

/**
 * 默认的退出登录处理函数
 */
function logOutFunc() {
  // 移除所有缓存，并且刷新页面
  SStorage.clear();
  Storage.clear();
  setTimeout(() => {
    window.location.reload();
  });
}

// 标志位，表示 是否 为正在退出中
let isLogoutIng = false;
const errorHandler = (error: AxiosError<ApiResponse>) => {
  if (error.response) {
    const data = error.response.data;
    toast.clearAll();
    if (error.response.status === 404) {
      toast.error(`NotFound\n${data.msg || error.response.statusText}`);
    }

    if (error.response.status === 400 || error.response.status === 500) {
      toast.error(`系统错误\n${data.msg || error.response.statusText}`);
    }

    if (error.response.status === 403) {
      toast.error(`您暂时无法访问\n${data.msg || error.response.statusText}`);
    }

    if (error.response.status === 401) {
      if (isLogoutIng) {
        return;
      }
      isLogoutIng = true;
      toast.error(`登录过期\n${data.msg || error.response.statusText}`);
      logOutFunc();
    }
  }
  return Promise.reject(error);
};

/**
 * get status code
 * @param {AxiosResponse} response Axios  response object
 */
const getErrorCode2text = (response: AxiosResponse<any>): string => {
  /** http status code */
  const code = response.status;
  /** notice text */
  let message = 'Request Error';
  switch (code) {
    case 400:
      message = 'Request Error';
      break;
    case 401:
      message = 'Unauthorized, please login';
      break;
    case 403:
      message = '拒绝访问';
      break;
    case 404:
      message = '访问资源不存在';
      break;
    case 408:
      message = '请求超时';
      break;
    case 500:
      message = '位置错误';
      break;
    case 501:
      message = '承载服务未实现';
      break;
    case 502:
      message = '网关错误';
      break;
    case 503:
      message = '服务暂不可用';
      break;
    case 504:
      message = '网关超时';
      break;
    case 505:
      message = '暂不支持的 HTTP 版本';
      break;
    default:
      message = '位置错误';
  }
  return message;
};

export function setupAxiosRequest(
  config: CreateAxiosDefaults = {
    baseURL: '',
    timeout: 10000,
    responseType: 'json',
    withCredentials: false,
    headers: {
      'Content-Type': 'application/json',
    },
  },
  reqInterceptorFunc: ReqInterceptorFunc
) {
  axiosInstance = axios.create(config);
  axiosInstance.interceptors.request.use(reqInterceptorFunc, errorHandler);

  const service = <T>({
    url,
    method = 'get',
    params,
    data,
  }: AxiosRequestConfig) =>
    axiosInstance.request<unknown, T>({
      url,
      method,
      params,
      data,
    });

  return {
    service,
  };
}

/**
 * @description 响应收到后的拦截器
 * @returns {}
 */
axiosInstance!.interceptors.response.use((response: AxiosResponse) => {
  if (response.status === 200) {
    return Promise.resolve(response.data);
  } else {
    const __text = getErrorCode2text(response);
    return Promise.reject(new Error(__text));
  }
}, errorHandler);
