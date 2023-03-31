import axios, { AxiosRequestConfig, Canceler } from 'axios';
import { isFunction } from '../util';

// 声明一个 Map 用于存储每个请求的标识和取消函数
let pendingMap = new Map<string, Canceler>();

export const getPendingUrl = (config: AxiosRequestConfig) =>
  [config.method, config.url].join('&');

export class AxiosCanceler {
  // 添加请求
  addPending(config: AxiosRequestConfig): void {
    this.removePending(config);
    const url = getPendingUrl(config);
    config.cancelToken =
      config.cancelToken ||
      new axios.CancelToken(cancel => {
        if (!pendingMap.has(url)) {
          // 如果 pending 中不存在当前请求，则添加进去
          pendingMap.set(url, cancel);
        }
      });
  }

  // 清空所有pending
  removeAllPending(): void {
    pendingMap.forEach(cancel => {
      cancel && isFunction(cancel) && cancel();
    });
    pendingMap.clear();
  }

  // 移除请求
  removePending(config: AxiosRequestConfig): void {
    const url = getPendingUrl(config);
    if (pendingMap.has(url)) {
      // 如果在 pending 中存在当前请求标识，需要取消当前请求，并且移除
      const cancel = pendingMap.get(url);
      cancel && cancel(url);
      pendingMap.delete(url);
    }
  }

  // 重置
  reset(): void {
    pendingMap = new Map<string, Canceler>();
  }
}
