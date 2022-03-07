/**
 * 正则验证
 */


/**
 * @description 手机号验证
 */
export const verifyPhone = (phone: string) => {
    return /^1[3-9]\d{9}$/.test(phone)
}

export const verifyIdCard = (idCard: string) => {
    // /(^\d{8}(0\d|10|11|12)([0-2]\d|30|31)\d{3}$)|(^\d{6}(18|19|20)\d{2}(0[1-9]|10|11|12)([0-2]\d|30|31)\d{3}(\d|X|x)$)/
    return /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(idCard)

}