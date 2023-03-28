import { AxiosResponse } from 'axios';

/**
 * 格式化秒数为 '00:00' 格式
 * @param seconds
 * @returns
 */
export function getMinutesTo0000(seconds: number): string {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  const formattedMinutes = (minutes < 10 ? '0' : '') + minutes;
  const formattedSeconds =
    (remainingSeconds < 10 ? '0' : '') + remainingSeconds;
  return formattedMinutes + ':' + formattedSeconds;
}

/**
 * 通用 XMLHttpRequest 下载函数
 * @param response
 * @param _filename
 * @param callback
 * @returns
 */
export function convertRes2Blob(
  response: AxiosResponse,
  _filename?: string,
  callback?: () => void
) {
  if (!response?.data?.size) return;
  // 提取文件名
  const filename =
    _filename ||
    response.headers['content-disposition']?.match(/filename=(.*)/)[1];
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
}

/**
 * 通过流的方式预览本地文件，比如图片，发返回解析的 bolb 地址，用作预览
 * @param callback
 * @returns
 */
export async function getPrivateFileByStream(
  response: AxiosResponse,
  _filename?: string,
  callback?: () => void
) {
  const blob = new Blob([response.data], { type: 'application/octet-stream' });
  const url = URL.createObjectURL(blob);
  callback?.();
  return url;
}

/**
 * 根据生日计算年龄
 * @param birthday 1995-12-21
 * @returns
 */
export const getAge = (birthday: string): string | number => {
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
 * @param week Dayjs().getWeekday()
 * @returns
 */
export function getWeekZhText(week: number): string {
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
}

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
    `display: none;position: fixed;top:0px;left: 0px;bottom: 0px;right: 0px;width: 100%;height: 100%;border: none;margin: 0px;padding: 0px;overflow: hidden;`
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
export function _setInterval(fn: () => void, millisec: number, count?: number) {
  let timer: NodeJS.Timeout;
  function interval() {
    if (typeof count === 'undefined' || count-- > 0) {
      timer = setTimeout(interval, millisec);
      try {
        fn();
      } catch (e: any) {
        count = 0;
        throw e.toString();
      }
    }
  }
  timer = setTimeout(interval, millisec);
  return {
    callback: () => clearTimeout(timer),
  };
}

/**
 * 手机号加 *
 * @param s
 * @returns
 */
export const makePhoneStar = (s: any) => {
  return s.replace(/^(\d{3})\d{4}(\d+)/, '$1****$2');
};

// 计算百分比，计算占比
