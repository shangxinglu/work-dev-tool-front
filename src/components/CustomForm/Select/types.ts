import { FormConfigBase, FormConfigBaseProps, FormTypeEnum } from "../types";
import { CheckboxItem } from "../Checkbox/types";
import { PropType } from "vue";

export interface SelectType extends FormConfigBase {
    formType: FormTypeEnum.Select,
    /**
     * @description 选项
     */
    options: CheckboxItem[];
    value?: number | string;
    placeholder?: string;

}

export const SelectProps = {
    ...FormConfigBaseProps,
    /**
     * @description 选项
     */
    options: {
        type: Array as PropType<CheckboxItem[]>,
        default: () => []
    },
    /**
     * @description 选中的值
     */
    value: {
        type: [Number, String]
    },
    placeholder: {
        type: String,
        default: '请选择'
    }


}

export type SelectProps = PropType<typeof SelectProps>;

export interface SelectState {
    select: number | CheckboxItem | undefined;
}

