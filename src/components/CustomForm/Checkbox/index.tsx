import { defineComponent } from "vue";
import style from "./index.module.less";
import { Icon } from 'vant'


import { CheckboxProps, Data, OptionsType, CheckboxItem, CheckboxItemObj, CheckboxValue, CheckboxRenderItem, } from './types'
import { getDataset } from '@/utils/helper'

export default defineComponent({
    name: "Checkbox",
    props: CheckboxProps,
    data(): Data {
        let value;
        if (this.single) {
            value = this.value || '';
        } else {
            value = this.value || [];
        }

        return {
            select: value,
            showSelectAll: this.single ? false : this.selectAll
        }
    },
    watch: {
        value(val) {
            // 设置初始值
            if ([null, undefined].includes(val)) {
                if (this.single) {
                    this.select = '';
                } else {
                    this.select = [];
                }
                return
            }
            this.select = val;
        },
    },
    emits: ['change', 'update:value'],
    methods: {
        onClickOption(e: MouseEvent) {
            if (this.disabled) return
            e.stopPropagation();
            // console.log('onClickOption', e);

            const index = getDataset(e, 'index');

            if ([null, undefined].includes(index)) return

            const val = this.getValue(parseInt(index))
            this.$emit('change', val)
            this.$emit('update:value', val)
        },
        getValueItem(item: CheckboxItem) {
            if (typeof item === 'string') {
                return item
            }
            return item.value

        },
        // 获取改变后的值
        getValue(index: number) {

            // 处理全选按钮
            if (index === -1) {
                // 取消全选
                if (this.getIsSelectAll()) {
                    return []
                }
                const newValue = []

                for (let item of this.options) {
                    newValue.push(this.getValueItem(item));
                }

                return newValue;

            }

            const item = this.options[index]
            const value: CheckboxValue = this.getValueItem(item);

            if (this.single) return value


            const oldVal = (this.select as Array<CheckboxValue>).slice();
            const itemIndex = oldVal.indexOf(value as any);
            if (itemIndex > -1) {
                oldVal.splice(itemIndex, 1)
            } else {
                oldVal.push(value as any)
            }


            return oldVal;
        },
        // 获取当前是否全选
        getIsSelectAll() {
            const { value, options, single, selectAll } = this;
            if (single || (!selectAll)) return false;
            return (value as CheckboxValue[])?.length === options.length;
        },

        // 判断是否选中
        getSelected(value: CheckboxValue) {
            const { select, single } = this;
            if (single) {
                return select === value
            } else {
                return (select as Array<CheckboxValue>).filter(item => item == value).length > 0
            }
        },
        renderInterLabel() {
            if (this.renderLabel) {
                return this.renderLabel(this.label)
            }
            if (!this.label) return '';
            return (
                <div class={['mt-8 mb-10 font--t5 text-grey vant__label', this.required ? 'vant__label--required' : '', this.labelClassName]}>{this.label}</div>
            )
        },
        renderCheckbox(item: CheckboxItemObj, index: number, select: boolean, optionType?: OptionsType) {
            let realIndex = index;
            const { single, selectAll } = this;
            if (!single && selectAll) {
                index++;
            }


            // 自定义优先
            if (this.renderItem) {
                return (
                    <div data-index={realIndex}>
                        {this.renderItem(item, index, select)}
                    </div>
                )
            }

            if (select) {
                return (
                    <div data-index={realIndex} class={['flex--center--v mr-10 mb-10 ', style["checkout__item"], style['checkout__item--select']]} >
                        <div class={['flex--center--v', this.single ? 'border__radius' : '', style['icon__selected']]}><Icon size={16} name="success"></Icon></div>
                        <div class={['ml-6 flex-1 font--t5',]}>{item.text}</div>
                    </div>
                );
            }
            return (
                <div data-index={realIndex} class={['mr-10 mb-10 flex--center--v', style['checkout__item'], ' text-black font--t5 ']}>
                    <div class={[' flex--center--v', this.single ? 'border__radius' : '', style['icon__selected']]}></div>
                    <div class={['ml-6']}>{item.text}</div>
                </div>
            );
        },
        renderOption() {
            const { options, single, selectAll } = this;

            const optionsVnode = options.map((item: CheckboxItem, index) => {
                if (typeof item === 'string') {
                    item = {
                        text: item,
                        value: item
                    };
                }

                if (this.getSelected(item.value)) {
                    return this.renderCheckbox(item, index, true);
                } else {
                    return this.renderCheckbox(item, index, false);
                }
            });

            // 处理全选按钮
            if (!single && selectAll) {
                optionsVnode.unshift(this.renderSelectAll())
            }

            return optionsVnode;

        },

        // 全选按钮
        renderSelectAll() {
            const { options, value } = this;
            const allItem = {
                text: this.selectAllText,
                value: ''
            }

            const isSelected = options.length === (value as CheckboxValue[])?.length;

            return this.renderCheckbox(allItem, -1, isSelected, OptionsType.All)
        }

    },
    render() {
        return (
            <div class={[this.className || `flex py-15 ${style['field']}`]} onClick={this.onClickOption}>
                {this.renderInterLabel()}
                <div class={[this.bodyClassName || 'flex-1']}>
                    {this.renderOption()}
                </div>

            </div>
        )
    }
});