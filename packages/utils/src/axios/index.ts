import { AxiosRequestConfig } from 'axios';
import { Axios } from './axios';
import { ContentTypeEnum } from './enum';
import { transform } from './transform';
import { CreateAxiosOptions, RequestOptions } from './types';
import { deepMerge } from '../util';

const createAxios = (opt?: Partial<CreateAxiosOptions>) => {
  const mergedOptions = deepMerge(
    {
      timeout: 6 * 10 * 1000, // 1min
      // 基础接口地址
      baseURL: '',
      // 接口可能会有通用的地址部分，可以统一抽取出来
      prefixUrl: '',
      headers: { 'Content-Type': ContentTypeEnum.JSON },
      // 数据处理方式
      transform,
      // 配置项，下面的选项都可以在独立的接口请求中覆盖
      requestOptions: {
        // 默认将prefix 添加到url
        joinPrefix: true,
        // 需要对返回数据进行处理
        isTransformRequestResult: true,
        // post请求的时候添加参数到url
        joinParamsToUrl: false,
        // 格式化提交参数时间
        formatDate: true,
        // 消息提示类型
        errorMessageMode: 'none',
        // 接口地址
        apiUrl: '',
      },
    },
    opt || {}
  );

  return new Axios(mergedOptions);
};

class AxiosHttp {
  private http: Axios | null = null;

  constructor(config: Partial<CreateAxiosOptions>) {
    this.init(config);
  }

  public getInstance(): Axios {
    return this.http!;
  }

  private init(config: Partial<CreateAxiosOptions>) {
    this.http = createAxios(config);
  }

  public service<T>(
    { url, method = 'get', params, data }: AxiosRequestConfig,
    options: RequestOptions = {}
  ): Promise<T> {
    return this.http!.request<T>({ url, params, data, method }, options);
  }

  // 根据 key 值返回指定的头
  public getHeader(keys: string[]) {
    const header = this.http!.getHeader();
    // 过滤 keys
    return { ...header };
  }

  /**
   * 设置 header
   * @param key
   */
  public setHeader(key: { [key: string]: any }) {
    this.http?.setHeader(key);
  }
}

export default AxiosHttp;
