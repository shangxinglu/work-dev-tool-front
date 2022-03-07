import { defineComponent, PropType } from "vue";
import style from "./index.module.less";
import { Field } from "vant";

import { InputTypeEnum, InputProps } from './types'
export default defineComponent({
    name: "Input",
    props: InputProps,
    emits: ["change", 'update:value'],
    data() {
        return {
            text: this.value || '',
        }
    },
    watch: {
        value(val) {
            val = String(val)
            if ([null, undefined].includes(val)) {
                val = '';
            }

            if (this.text !== val) {
                this.text = val;
            }
        },
        text(val) {
            if (this.value == val) return
            this.$emit('update:value', val)
            this.$emit("change", val);
        }
    },
    methods: {
        getSlot() {
            const slot = {} as any;
            if (this.renderLabel) {
                slot.label = () => this.renderLabel?.(this.label);
            }
            return slot;
        },
        // 右侧渲染
        renderGt() {
            const { unit, unitClassName, renderRight } = this;
            if (renderRight) return renderRight();
            if (unit) {
                return <div class={unitClassName || [style['default__unit'], 'ml-10']}>{unit}</div>
            }
            return ''
        }

    },
    render() {
        const slot = this.getSlot()
        return (
            <div class={this.className || [style['default'], 'flex--center--v']}>
                <Field disabled={this.disabled} type={this.inputType} required={this.required} {...slot} label={this.label} v-model={this.text} placeholder={this.placeholder} />
                {this.renderGt()}
            </div>
        )
    }
});