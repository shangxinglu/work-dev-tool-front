import { defineComponent } from "vue";
import { FormTypeEnum, RenderLabel } from '@/components/CustomForm/types';

import { CheckboxRenderItem, CheckboxItemObj } from '@/components/CustomForm/Checkbox/types'
import { CheckboxType } from "@/components/CustomForm/Checkbox/types";

export default defineComponent({
    methods: {
        getFilterCheckboxConfig(opts: { field: string, label: string, options: CheckboxItemObj[] }): CheckboxType {
            const { field, label = '', options } = opts
            return {
                formType: FormTypeEnum.Checkbox,
                selectAll: true,
                field,
                label,
                className: 'block',
                bodyClassName: 'flex--wrap',
                renderLabel: this.renderCheckboxLabel as RenderLabel,
                renderItem: this.renderCheckboxItem as CheckboxRenderItem,
                options: options
            }
        },
        renderCheckboxLabel(label: string): JSX.Element {
            return (
                <div class={['mt-15 font--t5 text-black']}>{label}</div>
            )
        },
        renderCheckboxItem(item: CheckboxItemObj, index: number, select: boolean) {
            if (select) {
                return (
                    <div class={['px-12 mr-12 mt-12 radius font--t5 py-6 bg-green text-white ']}>{item.text}</div>
                )
            } else {
                return (
                    <div class={['px-12  mr-12 mt-12 overflow-hidden radius font--t5 py-6 bg-neutral-4d text-black ']}>{item.text}</div>
                )
            }
        },
    },


});