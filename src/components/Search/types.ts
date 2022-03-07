import { AntiShakeResultHandler, AntiShakeResultCancel } from '@/utils/util'

import { PropType } from 'vue';


export const SearchProps = {
    /**
     * @description 搜索框提示文字
     */
    placeholder: {
        type: String as PropType<string>,
        default: '请输入搜索内容',
    },
    /**
     * @description 获取搜索数据
     */
    getData: {
        type: Function as PropType<GetSearchDataFn<any>>,
        default: () => []
    },
    /**
     * @description 为空时的提示文字
     */
    emptyText: {
        type: String as PropType<string>,
        default: '暂无数据',
    },
    /**
     * @description 为空时的提示图标
     */
    emptyImage: {
        type: String as PropType<string>,
        default: '',
    },
    emptyClassName: {
        type: String as PropType<string>,
        default: '',
    },
    renderItem: {
        type: Function as PropType<(item: any, index: number, searchText: string) => JSX.Element>,

    },

    searchIcon: {
        type: String as PropType<string>,
        default: ''
    }

}

export type SearchProps = PropType<typeof SearchProps>

export interface SearchState {
    searchText: string;
    promptList: any[];
    /**
     * @description 防抖函数
     *
     * @type {AntiShakeResultHandler}
     * @memberof SearchData
     */
    shakeHandler: AntiShakeResultHandler;
    /**
     * @description 防抖清除
     *
     * @type {AntiShakeResultCancel}
     * @memberof SearchData
     */
    shakeCancel: AntiShakeResultCancel;
    // /**
    //  * @description 显示提示列表 
    //  */
    // showPromptList:boolean,
    /**
     * @description 添加记录的文字
     */
    addRecordText: string;
    /**
     * @description 显示空提示
     */
    showEmpty: boolean;
}

export const getSearchState = (): SearchState => {
    return {
        searchText: '',
        promptList: [],
        shakeHandler: () => { },
        shakeCancel: () => { },
        addRecordText: '',
        showEmpty: false,
    }
}