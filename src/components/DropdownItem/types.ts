import { PropType, ExtractPropTypes } from "vue";

/**
 * @description 排序类型
 */
export enum SortType {
    /**
     * @description 倒序
     */
    reverse = 'reverse',
    /**
     * @description 默认排序
     */
    default = 'default',
    /**
     * @description 正序
     */
    positive = 'positive',

}

/**
 * @description 过滤条类型
 */
export enum DropdownBarType {
    /**
     * @description 排序
     */
    sort = 'sort',

    /**
     * @description 下拉菜单
     */
    dropdown = 'dropdown',
    /**
     * @description 筛选
     */
    filter = 'filter',
}

export interface OptionsSortItem {
    type: SortType;
    value: string;
}

export interface OptionsDropdownItem {
    text: string;
    value: string | number;
}

export const DropdownItemProps = {
    /**
     * @description 筛选类型
     */
    type: {
        type: String as PropType<DropdownBarType>,
        default: DropdownBarType.sort,
    },
    /**
     * @description 标题
     */
    title: {
        type: String as PropType<string>,
        default: '',
    },
    /**
     * @description 选项数据
     */

    options: {
        type: Array as PropType<OptionsDropdownItem[] | OptionsSortItem[]>,
        default: () => []
    }
}



export type DropdownItemProps = ExtractPropTypes<typeof DropdownItemProps>;

interface DropdownItemState {
    /**
     * @description 是否展开
     */
    isExpand: boolean;
    currentSelectIndex: number;
    currentSortType: SortType;
    value: any;

}


export const getDropdownItemState = (): DropdownItemState => {
    return {
        isExpand: false,
        currentSelectIndex: 0,
        currentSortType: SortType.default,
        value: null
    }
}


export type DropdownItemExpose = {
    /** @private */
    state: {
        showPopup: boolean;
        transition: boolean;
        showWrapper: boolean;
    };

};


export const DropdownItemEmits = {
    /**
     * @description 筛选条件改变
     */
    change: null,
    /**
     * @description 展开/收起
     */
    toggle: (isExpand: boolean) => true,
}


