import { defineComponent } from "vue";
import style from "./index.module.less";
import { Popup, Picker, Icon } from "vant";

import { SelectProps, SelectState } from './types'
import Input from '../Input'
import PopupBehavior from '@/behavior/popup'
import { CheckboxItem, CheckboxItemObj } from "../Checkbox/types";
export default defineComponent({
    props: SelectProps,
    mixins: [PopupBehavior],
    emits: ["change", 'update:value'],
    data(): SelectState {
        return {
            select: this.initSelect(this.value) || '',
        }
    },
    watch: {
        value(val) {
            if ([null, undefined].includes(val)) {
                this.select = '';
                return;
            }
            for (let item of this.options) {
                let optionVal = (item as CheckboxItemObj).value ?? item;
                if (optionVal === val) {
                    this.select = item
                    break;
                }
            }


        },
        select(val) {
            val = (val as CheckboxItemObj).value ?? val;
            this.$emit('update:value', val)
            this.$emit('change', val)
        }
    },
    methods: {
        initSelect(val: string) {

            for (let item of this.options) {
                let optionVal = (item as CheckboxItemObj).value ?? item;
                if (optionVal === val) {
                    return item
                    break;
                }
            }
        },
        onClick() {
            if (this.disabled) return
            this.setShowPopup();
        },
        onConfirm(data: CheckboxItemObj) {
            console.log('onConfirm', data);
            this.select = data;
            this.setHidePopup();
        },
        onCancel() {
            this.setHidePopup();
        },

        renderInterLabel() {
            if (this.renderLabel) {
                return this.renderLabel(this.label)
            }
            if (!this.label) return '';
            return (
                <div class={['mt-8 mb-10 font--t5  font-bold text-black', this.labelClassName]}>{this.label}</div>
            )
        },
        renderRight() {
            return (
                <div class={['ml-15']}>
                    <Icon size={10} name="arrow"></Icon>
                </div>
            )
        },
        renderInput() {
            return (
                <div onClick={this.onClick}>
                    <Input disabled={true} field={this.field} value={(this.select as CheckboxItemObj).text ?? this.select} label={this.label} required={this.required} renderRight={this.renderRight.bind(this)} placeholder={this.placeholder} />

                </div>
            )
        },
        renderPopup() {
            return (
                <Popup position={'bottom'} v-model:show={this.showPopup}>
                    <Picker onConfirm={this.onConfirm} onCancel={this.onCancel} title={this.label} columns={this.options}></Picker>
                </Popup >
            )
        }
    },
    render() {
        return (
            <div class={[style['select']]}>
                {this.renderInput()}
                {this.renderPopup()}
            </div>
        )
    }
});