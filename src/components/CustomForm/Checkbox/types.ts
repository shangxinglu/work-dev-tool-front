import { FormConfigBase, FormConfigBaseProps, FormTypeEnum } from '../types'
import { PropType } from 'vue';

export enum OptionsType {
    All = 'all',
}
export interface Data {
    select: number | string | Array<CheckboxValue>;
    // 是否显示全选按钮
    showSelectAll: boolean;
}

export type CheckboxValue = number | string
export interface CheckboxItemObj {
    text: string;
    value: CheckboxValue;
}

export type CheckboxItem = string | CheckboxItemObj;

/**
 * @description 多选框默认渲染函数
 * item 渲染项数据
 * selected 是否选中
 */
export interface CheckboxRenderItem {
    (item: CheckboxItemObj, index: number, select: boolean): any;
}

export interface CheckboxType extends FormConfigBase {
    formType: FormTypeEnum.Checkbox | FormTypeEnum.Radio;
    /**
     * @description 是否单选
     */
    single?: boolean;
    options: Array<CheckboxItem>;
    value?: number | string | Array<number | string>;
    /**
     * @description 选中图标
     */
    selectIcon?: string;
    /**
     * @description 自定义渲染项
     */
    renderItem?: CheckboxRenderItem;
    /**
     * @description 选项列表盒子的className
     */
    bodyClassName?: string;
    /**
     * @description  开启全选 仅多选模式
     */
    selectAll?: boolean;
    /**
     * @description 全选按钮的文案
     */
    selectAllText?: string;

}


export const CheckboxProps = {
    ...FormConfigBaseProps,

    /**
     * @description 选项数据
     */
    options: {
        type: Array as () => CheckboxItem[],
        default: () => []
    },

    /**
     * @description 选中的值
     */
    value: {
        type: [Array as () => Array<CheckboxValue>, Number, String],
        default: () => []
    },

    /**
     * @description 是否单选
     */
    single: {
        type: Boolean,
        default: false
    },

    /**
     * @description 选中图标
     */
    selectIcon: {
        type: String,
    },
    renderItem: {
        type: Function as PropType<CheckboxRenderItem>,
    },
    /**
     * @description 选项列表盒子的className
     */
    bodyClassName: {
        type: String,
        default: ""
    },
    /**
     * @description 启用全选
     */
    selectAll: {
        type: Boolean,
        default: false
    },
    /**
     * @description 全选按钮的文案
     */
    selectAllText: {
        type: String,
        default: "全选"
    }
}

export type CheckboxProps = PropType<typeof CheckboxProps>;
