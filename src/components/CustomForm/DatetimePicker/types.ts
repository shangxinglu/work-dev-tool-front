import { PropType } from 'vue'
import { FormTypeEnum, FormConfigBaseProps, FormConfigBase } from "../types";

export type DateDataType = 'date' | 'datetime' | 'time'

export interface DatetimePickerType extends FormConfigBase {
    formType: FormTypeEnum.Datetime;
    dateType?: DateDataType;
    /**
     * @description 最小日期
     */
    minDate?: Date;
    /**
     * @description 最大日期
     */
    maxDate?: Date;
    /**
     * @description 可选的最小小时
     */
    minHour?: number;
    /**
     * @description 可选的最大小时
     */
    maxHour?: number;
    /**
     * @description 可选的最小分钟
     */
    minMinute?: number;
    /**
     * @description 可选的最大分钟
     */
    maxMinute?: number;

    value?: string;
}

export const DatetimePickerProps = {
    ...FormConfigBaseProps,

    dateType: {
        type: String as PropType<DateDataType>,
        default: 'date'
    },
    mixDate: {
        type: Date,
    },
    maxDate: {
        type: Date,
    },
    minHour: {
        type: Number,
        default: 0
    },
    maxHour: {
        type: Number,
        default: 23

    },
    minMinute: {
        type: Number,
        default: 0
    },
    maxMinute: {
        type: Number,
        default: 59
    },
    value: {
        type: String,
        default: ''
    }
}


export type DatetimePickerProps = PropType<typeof DatetimePickerProps>;


export interface DatetimePickerState {
    date: Date | string;
}

export const DatetimePickerEmits = {
    change: (date: string) => true,
    'update:value': (date: string) => true
}