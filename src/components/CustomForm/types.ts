import { CheckboxType } from './Checkbox/types'
import { TextareaType } from './TextArea/types'
import { InputType } from './Input/types';
import { SelectType } from './Select/types';
import { UploaderType } from './Uploader/types';
import { DatetimePickerType } from './DatetimePicker/types';
import { DateRangePickerType } from './DateRangePicker/types';
import { PropType } from 'vue';

export enum FormTypeEnum {
    /**
     * @description 输入框
     */
    Input = 'input',
    /**
     * @description 多行文本
     */
    Textarea = 'textarea',
    /**
     * @description 下拉框
     */
    Select = 'select',
    /**
     * @description 复选框
     */
    Checkbox = 'checkbox',
    /**
     * @description 单选框
     */
    Radio = 'radio',
    /**
     * @description 文件上传
     */
    Uploader = 'uploader',
    /**
     * @description 日期范围选择
     */
    DateRange = 'date-range',
    /**
     * @description 日期选择
     */
    Datetime = 'datetime',

}
export type VerifyConfig = VerifyConfigItem[]

// 验证规则配置
export interface VerifyConfigItem {
    // 必填
    required?: boolean;
    // 最小长度
    minLength?: number;
    // 最大长度
    maxLength?: number;
    // 最小值
    min?: number;
    // 最大值
    max?: number;
    // 正则表达式
    pattern?: RegExp;
    // 错误提示
    errMessage?: string;

    showPrompt?: boolean;
}

export interface VerifyResult {
    // 验证结果
    status: boolean;
    // 错误提示
    errMessage?: string;
}

// 表单数据
export type FormData = Array<FormConfigItem>

export type FormConfigItem = CheckboxType | TextareaType | InputType | SelectType | UploaderType | DateRangePickerType | DatetimePickerType


export interface RenderLabel {
    (label: string): JSX.Element;
}

// 表单配置
export interface FormConfigBase {
    /**
     * @description 表单类型
     */
    formType: FormTypeEnum;
    /**
     * @description 验证规则
     */
    rules?: VerifyConfig;
    /**
     * @description 字段名
     */
    field: string;
    /**
     * @description 标签
     */
    label?: string;
    /**
     * @description 类名
     */
    className?: string;
    /**
     * @description 标签class
     */
    labelClassName?: string;
    /**
     * @description 必填星号
     */
    required?: boolean;
    /**
     * @description 标签渲染函数
     */
    renderLabel?: RenderLabel;

    placeholder?: string;
    disabled?: boolean;

}


export const FormConfigBaseProps = {
    rules: {
        type: Array as PropType<VerifyConfig>,
    },
    /**
 * @description 字段名
 */
    field: {
        type: String,
        default: ''
    },
    /**
     * @description 标签
     */
    label: {
        type: String,
        default: ''
    },
    /**
     * @description 类名
     */
    className: {
        type: String,
        default: ''
    },
    /**
     * @description 标签class
     */
    labelClassName: {
        type: String,
        default: ''
    },
    /**
     * @description 必填星号
     */
    required: {
        type: Boolean,
        default: false
    },
    /**
     * @description 标签渲染函数
     */
    renderLabel: {
        type: Function as PropType<RenderLabel>,
    },
    placeholder: {
        type: String,
        default: ''
    },

    disabled: {
        type: Boolean,
        default: false
    }
}

export type FormConfigBaseProps = PropType<typeof FormConfigBaseProps>;



