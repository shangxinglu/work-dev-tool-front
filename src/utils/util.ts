export interface AntiShakeResultHandler {
  (): void;
}

export interface AntiShakeResultCancel {
  (): void;
}

export interface AntiShakeResult {
  /**
   * @description 防抖函数
   *
   * @memberof AntiShakeResult
   */
  handler: AntiShakeResultHandler;

  /**
   * @description 用来清除防抖的函数
   *
   * @memberof AntiShakeResult
   */
  cancel: AntiShakeResultCancel;
}

/**
 * @desc 防抖
 * @param {Function} fn 调用函数
 * @param {Number} delay 防抖时间 单位ms
 * @param {Object} thisArg 需要绑定的this
 * @returns {Object}
 */
export const antiShake = (fn: Function, delay: number, thisArg: any) => {
  let timer: number | null = null;
  fn = fn.bind(thisArg)
  const handler = (...rset: any[]) => {
    fn(...rset)
    timer = null
  }
  return {
    handler() {
      if (timer) {
        clearTimeout(timer)
        timer = setTimeout(handler, delay, ...arguments)
        return
      }

      timer = setTimeout(handler, delay, ...arguments)
    },
    cancel() {
      if (!timer) return
      clearTimeout(timer)
    }
  }
}


export interface PreventRepeatedClickResult {
  disabled: () => void;
  enable: () => void;
  getStatus: () => boolean;
}

/**
 * @description 防止重复点击
 */
export function preventRepeatedClick(status: boolean = true): PreventRepeatedClickResult {
  let clickable = status;
  return {
    disabled() {
      clickable = false;
    },
    enable() {
      clickable = true;
    },
    getStatus() {
      return clickable;
    }
  }
}

/**
 * @description 获取距离文字
 * 
 * @param distance 
 * @returns 
 */
export const getDistanceText = (distance: number): string => {
  if (distance > 1000) {
    return `${(distance / 1000).toFixed(1)}km`
  }
  return `${distance}m`
}

/**
 * @description 判断是否是''、undefined、null
 */
export const isFalse = (val: any): boolean => {
  return ['', undefined, null].includes(val);
}

/**
 * @description 判断数组元素是否都是''、undefined、null或长度为0
 */
export const isFalseArr = (value: any[]): boolean => {
  if (value.length === 0) return true
  for (let item of value) {
    if (!isFalse(item)) return false
  }
  return true
}

export const isTrue = (val: any): boolean => {
  return !['', undefined, null].includes(val);
}

/**
 * @description 打电话
 */
export const callUp = (phone: string) => {
  location.href = `tel:${phone}`
}

/**
 * @description 将对象转成encodeurl格式
 * @param params 
 * @returns 
 */
export const getParamUrl = (params: any) => {
  let str = ''

  const keys = Object.keys(params);
  for (let key of keys) {
    str += `${key}=${params[key]}&`;
  }
  return str.slice(0, -1)
}


/**
 * @description 将px转为vw
 */
export const pxToVw = (px: number | string) => {
  if (typeof px === 'string') {
    px = parseFloat(px)
  }
  return `${(px / 375) * 100}vw`
}

export const getRandomNumber = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
}


/**
 * @description 获取元素的大小及其相对于视口的位置
 */
export const getClientRect = (el: string | Element): DOMRect | null => {
  if (typeof el === 'string') {
    el = document.querySelector(el) as Element;
    if (!el) return null;
  }

  const rect = el.getBoundingClientRect();
  return rect;
}

/**
 * @description 清空无效参数
 */
export const clearInvalidParams = function (params: any) {
  const keys = Object.keys(params);
  for (let key of keys) {
    const item = params[key];
    if (["", undefined, null].includes(item)) {
      delete params[key];
    }
  }
};

export const formatMoney = (money: number): {
  unit: string;
  money: number;
} => {
  if (money >= 10000) {
    return {
      unit: `万元`,
      money: parseFloat((money / 10000).toFixed(0))
    }
  }
  return {
    unit: `元`,
    money: money
  }
}

export const getImageArr = (string: string | null): string[] => {
  if (!string) return []
  return string.split(',').filter(item => item)
}

interface IStringTransform {
  format: (str: string) => string;
}

/**
 * @description 字符串转换
 */
export const stringTransform = (str: string, options: IStringTransform) => {
  const { format } = options
  const result = str.toLocaleLowerCase().replace(/((?:\s|\-)\w)/g, (match: string) => {
    match = match.replace(/-/, '');
    return format(match)
  });
  return result
}

/**
 * @description 转驼峰
 */
export const turnHump = (str: string, type: 'small' | 'big' = 'small'): string => {
  str = str.trim().toLowerCase();


  let result = stringTransform(str, {
    format(match: string) {

      return match.trim().toLocaleUpperCase()
    }
  })
  if (type === 'big') {
    result = result.replace(result[0], result[0].toUpperCase());
  }
  return result
}

export const turnCrossbar = (str: string): string => {
  str = str.trim().toLowerCase();


  let result = stringTransform(str, {
    format(match: string) {
      return '-' + match.trim()
    }
  })

  return result
}

export const copy = (str: string) => {
  console.log(str);

  const { clipboard } = navigator;
  return clipboard.writeText(str);
}