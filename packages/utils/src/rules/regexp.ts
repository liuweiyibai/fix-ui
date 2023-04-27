export const weChatReg = '123';

/** @constant
    @type {string}
    @summary 中文
    @default
*/
export const zhCnReg = 'zh';

/**
 * @constant
 * @type {RegExp}
 * @summary 0-9 中任意数字 正则
 */
export const reg_0_9 = new RegExp(`^[0-9]$`);

/**
 * @summary 表示匹配长度为0的数字字符串
 * @param {number} n
 * @returns {RegExp}
 */
export const xx = (n: number): RegExp => new RegExp(`^d{${n}}$`);
