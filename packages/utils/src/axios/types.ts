import type { InternalAxiosRequestConfig } from 'axios';
import { AxiosRequestConfig } from 'axios';
import { AxiosTransform } from './axios.transform';

// http 接口返回的内容基础结构
export interface ApiResponse<T = any> {
  code: number;
  msg?: string;
  data?: T;
}

// 通用列表返回结构
export interface HttpListResp<T> {
  current: number;
  records: T[];
  size: number;
  total: number;
}

export type TypeSetupAxiosRequestParams = {
  baseUrl: string;
};

export type ReqInterceptorFunc =
  | ((
      value: InternalAxiosRequestConfig
    ) => InternalAxiosRequestConfig | Promise<InternalAxiosRequestConfig>)
  | null;

export interface RequestOptions {
  // 请求参数拼接到url
  joinParamsToUrl?: boolean;

  // 格式化请求参数时间
  formatDate?: boolean;

  // 是否指定接口前拼接 http://xxx.api.com/api/ 类似
  prefixUrl?: string;

  // 是否拼接通用接口前缀，比如 /api/v1
  apiPrefix?: string;

  // 错误消息提示类型
  onError?: 'none' | 'modal';

  // 自定义处理请求结果
  customTransformResult?: Function | null;
}

export interface CreateAxiosOptions extends AxiosRequestConfig {
  prefixUrl?: string;
  transform?: AxiosTransform;
  requestOptions?: RequestOptions;
  onError?: (msg: string, status: number) => void | null;
}
