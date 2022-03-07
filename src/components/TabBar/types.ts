

import style from './index.module.less'
export interface TarItemData {
    iconClassName?: string

    /**
     * @description 默认图标
     *
     * @type {string}
     * @memberof TarItemData
     */
    icon: string;

    /**
     * @description 选中图标
     *
     * @type {string}
     * @memberof TarItemData
     */
    selectIcon: string;

    /**
     * @description 跳转路由
     *
     * @type {string}
     * @memberof TarItemData
     */
    url: string;
    /**
     * @description 文字
     *
     * @type {string}
     * @memberof TarItemData
     */
    text: string;

    /**
     * @description 是否显示红点
     */
    isShowRedDot: boolean;
    click?: () => void;
}

let config: TarItemData[];

/**
 * @description 设置底部配置数据
 */
export const setConfig = (data: TarItemData[]) => {
    config = data;
}


export const setTabBarRedDot = (index: number, isShow: boolean) => {
    if (index >= 0 && index < config.length) {
        config[index].isShowRedDot = isShow;
    }
}

export {
    config
}


export interface TabbarState {
    /**
     * @description 当前选中链接
     */
    activeUrl: string;
    config: TarItemData[];



}

