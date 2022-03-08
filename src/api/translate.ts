import { Post } from '@/network/request'
import { turnCrossbar, turnHump } from '@/utils/util';

export interface TranslateState {
    /**
     * @description 当前翻译的内容
     */
    text: string;
    /**
     * @description 翻译结果
     */
    result: string;

    /**
     * @description 大驼峰
     */
    bigHump: string;
    /**
     * @description 小驼峰
     */
    smallHump: string;

    /**
     * @description -链接
     */
    crossbar: string;

}

/**
 * @description 中文翻译成英文
 */
export const postZhToEnAPI = async (text: string) => {
    const res: string = await Post('/api/zhToEn', { text });
    console.log('中文翻译成英文', res);

    return res;
}

export const dealzhToZh = async function (this: TranslateState) {
    const res = await postZhToEnAPI(this.text);
    this.result = res;
    this.smallHump = turnHump(res);
    this.bigHump = turnHump(res, 'big');
    this.crossbar = turnCrossbar(res);

}