/**
 * user相关
 */
// import { UserInfoData } from '@/api/login'
import { cookies } from '@/state/cookie'

type UserInfoData = any;




/**
 * @description token设置
 */
export function setToken(token: string) {
    localStorage.setItem('token', token);
}

export function setTokenType(tokenType: string) {
    localStorage.setItem('tokenType', tokenType);
}


export function getToken() {
    const token = localStorage.getItem('token') || 'enRlc2E6enRlc2E=';
    return token;
}

export function getTokenType() {
    const tokenType = localStorage.getItem('tokenType') || 'Basic';
    return tokenType;
}

/**
 * @description 退出登录
 */
export function singOut() {
    setToken('');
    cookies.removeItem('jeesite.session.id', location.pathname, location.hostname);
}

interface UserInfo extends UserInfoData {
}

export function setUserInfo(userInfo: UserInfo) {
    localStorage.setItem('userInfo', JSON.stringify(userInfo));
}

export function getUserInfo(): UserInfo {
    const userInfo = localStorage.getItem('userInfo') || 'null';
    return JSON.parse(userInfo);
}

export function setUserPhone(phone: string) {
    localStorage.setItem('userPhone', phone);
}

export function getUserPhone() {
    const phone = localStorage.getItem('userPhone') || '';
    return phone;
}

