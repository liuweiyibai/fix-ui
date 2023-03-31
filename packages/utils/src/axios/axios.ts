import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  HeadersDefaults,
  InternalAxiosRequestConfig,
} from 'axios';
import { AxiosCanceler } from './axios.cancel';
import { AxiosTransform } from './axios.transform';
import { CreateAxiosOptions, RequestOptions, ApiResponse } from './types';
import { isFunction } from '../util';

// axios模块
export class Axios {
  private axiosInstance: AxiosInstance;
  private options: CreateAxiosOptions;

  constructor(options: CreateAxiosOptions) {
    this.options = options;
    this.axiosInstance = axios.create(options);
    this.setupInterceptors();
  }

  // 创建axios实例
  private createAxios(config: CreateAxiosOptions): void {
    this.axiosInstance = axios.create(config);
  }

  private getTransform(): AxiosTransform | undefined {
    const { transform } = this.options;
    return transform;
  }

  getAxios(): AxiosInstance {
    return this.axiosInstance;
  }

  // 重新配置axios
  configAxios(config: CreateAxiosOptions): void {
    if (!this.axiosInstance) return;
    this.createAxios(config);
  }

  // 设置通用header
  setHeader(headers: any): void {
    if (!this.axiosInstance) return;
    Object.assign(this.axiosInstance.defaults.headers, headers);
  }

  getHeader(): HeadersDefaults {
    return this.axiosInstance.defaults.headers;
  }

  // 拦截器配置
  private setupInterceptors(): void {
    const transform = this.getTransform();

    if (!transform) return;

    const {
      requestInterceptors,
      requestInterceptorsCatch,
      responseInterceptors,
      responseInterceptorsCatch,
    } = transform;

    const axiosCanceler = new AxiosCanceler();

    const reqInterceptor = (config: InternalAxiosRequestConfig) => {
      const { headers: { ignoreCancelToken } = { ignoreCancelToken: false } } =
        config;
      !ignoreCancelToken && axiosCanceler.addPending(config);

      if (requestInterceptors && isFunction(requestInterceptors)) {
        config = requestInterceptors(config);
      }

      return config;
    };

    // 请求拦截器配置处理
    this.axiosInstance.interceptors.request.use(reqInterceptor, undefined);

    // 请求拦截器错误捕获
    if (requestInterceptorsCatch && isFunction(requestInterceptorsCatch)) {
      this.axiosInstance.interceptors.request.use(undefined, err => {
        requestInterceptorsCatch(err, this.options);
      });
    }

    // 响应结果拦截器处理
    this.axiosInstance.interceptors.response.use((res: AxiosResponse<any>) => {
      res && axiosCanceler.removePending(res.config);

      if (responseInterceptors && isFunction(responseInterceptors)) {
        res = responseInterceptors(res);
      }

      return res;
    }, undefined);

    // 响应结果拦截器错误捕获
    if (responseInterceptorsCatch && isFunction(responseInterceptorsCatch)) {
      this.axiosInstance.interceptors.response.use(undefined, (err: Error) => {
        responseInterceptorsCatch(err, this.options);
      });
    }
  }

  // 请求方法
  request<T>(config: AxiosRequestConfig, options?: RequestOptions): Promise<T> {
    let conf: AxiosRequestConfig = { ...config };
    const transform = this.getTransform();

    const { requestOptions } = this.options;

    const opt: RequestOptions = Object.assign({}, requestOptions, options);
    const aOptions: CreateAxiosOptions = Object.assign({}, this.options, {
      requestOptions: opt,
    });

    const { beforeRequestHook, requestCatch, transformRequestData } =
      transform || {};

    if (beforeRequestHook && isFunction(beforeRequestHook)) {
      conf = beforeRequestHook(conf, aOptions);
    }

    return new Promise((resolve, reject) => {
      this.axiosInstance
        .request<any, AxiosResponse<ApiResponse>>(conf)
        .then((res: AxiosResponse<ApiResponse>) => {
          if (transformRequestData && isFunction(transformRequestData)) {
            const ret = transformRequestData(res, aOptions);
            resolve(ret);
          }
          resolve(res as unknown as Promise<T>);
        })
        .catch((e: Error) => {
          if (requestCatch && isFunction(requestCatch)) {
            reject(requestCatch(e));

            return;
          }
          reject(e);
        });
    });
  }
}
