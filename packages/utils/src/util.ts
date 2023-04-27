import { AxiosResponse } from 'axios';

/**
 * 格式化秒数为 '00:00' 格式
 * @param seconds
 * @returns
 */
export const getMinutesTo0000 = (seconds: number): string => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  const formattedMinutes = (minutes < 10 ? '0' : '') + minutes;
  const formattedSeconds = (remainingSeconds < 10 ? '0' : '') + remainingSeconds;
  return formattedMinutes + ':' + formattedSeconds;
};

/**
 * 通用 XMLHttpRequest 下载函数
 * @param response
 * @param _filename
 * @param callback
 * @returns
 */
export const convertRes2Blob = (response: AxiosResponse, _filename?: string, callback?: () => void) => {
  if (!response?.data?.size) return;
  // 提取文件名
  const filename = _filename || response.headers['content-disposition']?.match(/filename=(.*)/)[1];
  // 将二进制流转为blob
  const blob = new Blob([response.data], { type: 'application/octet-stream' });
  // 创建新的URL并指向File对象或者Blob对象的地址
  const blobURL = window.URL.createObjectURL(blob);
  // 创建a标签，用于跳转至下载链接
  const tempLink = document.createElement('a');
  tempLink.style.display = 'none';
  tempLink.href = blobURL;

  tempLink.setAttribute('download', decodeURIComponent(filename));
  // 兼容：某些浏览器不支持HTML5的download属性
  if (typeof tempLink.download === 'undefined') {
    tempLink.setAttribute('target', '_blank');
  }
  // 挂载a标签
  document.body.appendChild(tempLink);
  tempLink.click();
  document.body.removeChild(tempLink);
  // 释放blob URL地址
  window.URL.revokeObjectURL(blobURL);

  callback?.();
};

/**
 * 通过流的方式预览本地文件，比如图片，发返回解析的 bolb 地址，用作预览
 * @param callback
 * @returns
 */
export const getPrivateFileByStream = (response: AxiosResponse, _filename?: string, callback?: () => void) => {
  const blob = new Blob([response.data], { type: 'application/octet-stream' });
  const url = URL.createObjectURL(blob);
  callback?.();
  return url;
};

/**
 * 根据生日计算年龄
 * @param birthday 1995-12-21
 * @returns
 */
export const getAgeByBirth = (birthday: string): string | number => {
  let age;
  const birthdayArr = birthday.split('-') as unknown as number[];
  const birthdayYear = birthdayArr[0];
  const birthdayMonth = birthdayArr[1];
  const birthdayDay = birthdayArr[2];
  const today = new Date();
  const nowYear = today.getFullYear();
  const nowMonth = today.getMonth() + 1;
  const nowDay = today.getDate();
  if (nowYear === birthdayYear) {
    age = 0; // 同年则为0岁
  } else {
    const ageDiff = nowYear - birthdayYear; // 年之差
    if (ageDiff > 0) {
      if (nowMonth === birthdayMonth) {
        const dayDiff = nowDay - birthdayDay; // 日之差
        if (dayDiff < 0) {
          age = ageDiff - 1;
        } else {
          age = ageDiff;
        }
      } else {
        const monthDiff = nowMonth - birthdayMonth; // 月之差
        if (monthDiff < 0) {
          age = ageDiff - 1;
        } else {
          age = ageDiff;
        }
      }
    } else {
      age = '未知'; // 返回-1 表示出生日期输入错误 晚于今天
    }
  }
  return age; // 返回周岁年龄
};

/**
 * 获取今天周几
 * @param week dayjs.day()
 * @returns
 */
export const getWeekZhText = (week: number): string => {
  switch (week) {
    case 1:
      return '一';
    case 2:
      return '二';
    case 3:
      return '三';
    case 4:
      return '四';
    case 5:
      return '五';
    case 6:
      return '六';
    default:
      return '日';
  }
};

/**
 * 打印函数
 * @param url
 * @param callback
 */
export const printPdfByIframe = (url: string, callback?: () => void) => {
  const pdf = document.createElement('iframe');
  pdf.src = url;
  pdf.name = 'print_frame';
  pdf.id = 'print_frame';

  pdf.setAttribute(
    'style',
    `display: none;position: fixed;top:0px;left: 0px;bottom: 0px;right: 0px;width: 100%;height: 100%;border: none;margin: 0px;padding: 0px;overflow: hidden;`,
  );

  document.body.append(pdf);

  setTimeout(() => {
    pdf.contentWindow?.focus();
    pdf.contentWindow?.print();
    if (callback) {
      callback();
      document.removeChild(pdf);
    }
  }, 1000);
};

/**
 * 使用 setTiemout 重新定义 interval 定时函数
 * @param fn
 * @param millisec
 * @param count
 * @returns
 */
export const _setInterval = (fn: () => void, millisec: number, count?: number) => {
  let timer: NodeJS.Timeout;
  const interval = () => {
    if (typeof count === 'undefined' || count-- > 0) {
      timer = setTimeout(interval, millisec);
      try {
        fn();
      } catch (e: any) {
        count = 0;
        throw e.toString();
      }
    }
  };
  timer = setTimeout(interval, millisec);
  return {
    callback: () => clearTimeout(timer),
  };
};

/**
 * 手机号加 *
 * @param s
 * @returns
 */
export const makePhoneStar = (s: any) => {
  return s.replace(/^(\d{3})\d{4}(\d+)/, '$1****$2');
};

/**
 * 字符串超出多少字符后展示省略号
 * @param str
 * @param num
 * @returns
 */
export const splitStrByNum = (str: string, num: number) => {
  if (str.length <= num) {
    return str;
  }
  return str.substring(0, num) + '...';
};

/**
 * 计算百分比
 * @param num
 * @param total
 * @returns
 */
export const calcPercent = (num: number, total: number) => {
  return Math.round((num / total) * 10000) / 100.0; // 小数点后两位百分比
};

/**
 * 根据参数将字符串分成块
 * @param str
 * @param chunk
 * @returns
 */
export const makeChunkStr = (str: string, chunk = 4) => {
  const resp: string[] = [];
  for (let i = 0, j = str.length; i < j; i += chunk) {
    resp.push(str.slice(i, i + chunk));
  }
  return resp;
};

/**
 * 判断数据类型，是否为某种数据类型
 * @param val
 * @param type
 * @returns
 */
export const is = (val: any, type: string) => {
  return toString.call(val) === `[object ${type}]`;
};

/**
 * 判断是不是函数类型
 * @param val
 * @returns
 */
export const isFunction = (val: any): val is typeof Function => typeof val === 'function';

/**
 * 判断类型是否为字符串
 * @param val
 * @returns
 */
export const isString = (val: any): val is string => {
  return is(val, 'String');
};

/**
 * 类型是否为对象
 * @param item
 * @returns
 */
export const isObject = (item: any): boolean => {
  return item && typeof item === 'object' && !Array.isArray(item);
};

/**
 * 是否为数组
 * @param origin
 * @returns
 */
export const isArr = (origin: any): boolean => {
  const str = '[object Array]';
  return Object.prototype.toString.call(origin) == str ? true : false;
};

/**
 * 将对象转为 urlquery方式
 * @param baseUrl
 * @param obj
 * @returns
 */
export const setObjToUrlParams = (baseUrl: string, obj: any): string => {
  let parameters = '';
  let url = '';
  for (const key in obj) {
    parameters += key + '=' + encodeURIComponent(obj[key]) + '&';
  }
  parameters = parameters.replace(/&$/, '');
  if (/\?$/.test(baseUrl)) {
    url = baseUrl + parameters;
  } else {
    url = baseUrl.replace(/\/?$/, '?') + parameters;
  }
  return url;
};

/**
 * 对象深度合并
 * @param src
 * @param target
 * @returns
 */
export const deepMerge = <T = any>(src: any, target: any): T => {
  let key: string;
  for (key in target) {
    src[key] =
      src[key] && src[key].toString() === '[object Object]'
        ? deepMerge(src[key], target[key])
        : (src[key] = target[key]);
  }
  return src;
};

/**
 * @description 根据身份证号自动生成性别、出生日期和年龄
 * @param {string} idCard 身份证号
 * @returns
 */
export function parseIdCard(idCard: string) {
  const birthYear = parseInt(idCard.substr(6, 4), 10);
  const birthMonth = parseInt(idCard.substr(10, 2), 10) - 1;
  const birthDay = parseInt(idCard.substr(12, 2), 10);
  const genderCode = parseInt(idCard.substr(16, 1), 10);
  const gender = genderCode % 2 === 0 ? '女' : '男';
  const birthDate = new Date(birthYear, birthMonth, birthDay);
  const now = new Date();
  const age =
    now.getFullYear() -
    birthYear -
    (now.getMonth() < birthMonth || (now.getMonth() === birthMonth && now.getDate() < birthDay) ? 1 : 0);
  return {
    gender,
    birthDate,
    age,
  };
}
