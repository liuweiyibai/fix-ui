import type { InternalAxiosRequestConfig } from 'axios';

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
