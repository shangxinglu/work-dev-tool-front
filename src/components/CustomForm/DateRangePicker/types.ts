import { FormTypeEnum, FormConfigBaseProps, FormConfigBase } from '../types'
import { PropType } from 'vue';
import type { DateDataType } from '../DatetimePicker/types'


export enum TimeType {
    /**
     *  @description 开始时间
     */
    Start = 'start',

    /**
     * @description 结束时间
     */
    End = 'end',
}

export interface DateRangePickerType extends FormConfigBase {
    formType: FormTypeEnum.DateRange;
    dateType?: DateDataType;
    minDate?: Date;
    maxDate?: Date;
    value?: [Date?, Date?] | [string?, string?];
}

export interface DateRangePickerData {
    /**
     * @description 选择的时间
     */
    date: [Date?, Date?] | [string?, string?];
    /**
     * @description 当前操作的时间类型
     */
    currentType: TimeType;
}

export const DateRangePickerProps = {
    ...FormConfigBaseProps,
    dateType: {
        type: String as PropType<DateDataType>,
        default: 'date'
    },
    minDate: {
        type: Date,
    },
    maxDate: {
        type: Date,
    },
    value: {
        type: Array as () => Array<string | undefined>,
        default: () => [],
    },
    minDatePlaceholder: {
        type: String,
        default: "开始日期",
    },
    maxDatePlaceholder: {
        type: String,
        default: "结束日期",
    },





}

export type DateRangePickerProps = PropType<typeof DateRangePickerProps>;



