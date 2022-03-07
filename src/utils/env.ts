
let userAgent = navigator?.userAgent

const WeChatReg = /MicroMessenger/i
const IOSReg = /\(i[^;]+;( U;)? CPU.+Mac OS X/
const AndroidReg = /Android|Adr/
const MobileReg = /Mobile/i
const MiniProgram = /miniProgram/i
// 农业银行
const ABC = /bankabc/i

// 微信浏览器
export const isWeChat = WeChatReg.test(userAgent)

// 安卓
export const isAndroid = AndroidReg.test(userAgent)

// IOS
export const isIOS = IOSReg.test(userAgent)

// 移动端
export const isMobile = MobileReg.test(userAgent)

// 微信小程序web-view
export const isMiniProgram = MiniProgram.test(userAgent)

// 农行
export const isABC = ABC.test(userAgent)
