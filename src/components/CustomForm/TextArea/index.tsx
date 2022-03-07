import { defineComponent } from "vue";
import style from "./index.module.less";
import { Field } from "vant";
import { TextareaProps } from "./types";
export default defineComponent({
    props: TextareaProps,
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
    methods: {},
    render() {
        return (
            <div class={this.className || [style['default'], 'flex--center--v']}>
                <Field disabled={this.disabled} type="textarea" show-word-limit={true} maxlength={this.maxLength} required={this.required} label={this.label} v-model={this.text} />
            </div>
        )
    }
});