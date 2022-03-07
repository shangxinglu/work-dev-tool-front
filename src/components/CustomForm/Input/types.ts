import { PropType } from 'vue';
import { FormConfigBase, FormConfigBaseProps } from '../types'


export interface RenderRight {
    (unit?: string): any;
}

export enum InputTypeEnum {
    Text = 'text',
    Password = 'password',
    Digit = 'digit',
    Number = 'number',
}
export interface InputType extends FormConfigBase {
    placeholder?: string;
    /**
     * @description 单位class
     */
    unitClassName?: string;
    inputType?: InputTypeEnum;
    /**
     * @description 禁用
     */
    disabled?: boolean;
    /**
     * @description 单位
     */
    unit?: string;
    value?: string;
    // 右侧渲染
    renderRight?: RenderRight;
}

export const InputProps = {
    ...FormConfigBaseProps,
    /**
     * @description 占位符
     */
    placeholder: {
        type: String,
        default: ''
    },
    /**
     * @description 单位class
     */
    unitClassName: {
        type: String,
        default: ''
    },
    /**
     * @description 输入框类型
     */
    inputType: {
        type: String as PropType<InputTypeEnum>,
        default: InputTypeEnum.Text
    },
    /**
     * @description 禁用
     */
    disabled: {
        type: Boolean,
        default: false,
    },
    /**
     * @description 单位
     */
    unit: {
        type: String,
        default: ''
    },
    value: {
        type: [String, Number],
        default: ''
    },
    /**
     * @description 右侧渲染
     */
    renderRight: {
        type: Function as PropType<RenderRight>,
    },
}

export type InputProps = PropType<typeof InputProps>;



