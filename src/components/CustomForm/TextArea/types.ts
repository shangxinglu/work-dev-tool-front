import { PropType } from 'vue';
import { FormConfigBase, FormConfigBaseProps } from '../types'

export interface TextareaType extends FormConfigBase {
    /**
     * @description 占位符
     */
    placeholder?: string;
    maxLength?: number;
    value?: string;
}

export const TextareaProps = {
    ...FormConfigBaseProps,
    /**
     * @description 占位符
     */
    placeholder: {
        type: String,
        default: ''
    },
    /**
     * @description 最大长度
     */
    maxLength: {
        type: Number,
        default: 200
    },
    value: {
        type: String,
        default: ''
    },
}

export type TextareaProps = PropType<typeof TextareaProps>;