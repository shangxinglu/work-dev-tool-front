import { defineComponent } from "vue";
// import style from "./index.module.less";
import {
    FormTypeEnum,
    FormData,
    VerifyConfig,
    VerifyResult,
    FormConfigItem

} from './types';
import Checkbox from './Checkbox';
import { CheckboxType } from './Checkbox/types'
import Input from './Input';
import TextArea from "./TextArea";
import Select from './Select'

import DateRangePicker from "./DateRangePicker";
import DatetimePicker from "./DatetimePicker";
import Uploader from "./Uploader";

import { Toast } from "vant";



export default defineComponent({
    name: "Form",
    props: {
        rules: {
            type: Object as () => VerifyConfig,
        },
        config: {
            type: Array as () => FormData,
            default: () => []
        }
    },
    data() {
        return {
            form: this.normalizeForm(),
        }
    },
    watch: {
        config() {
            this.form = this.normalizeForm()
        }
    },
    emits: ['change', 'fail'],
    methods: {
        // 标准化表单数据
        normalizeForm() {
            const form: any = {}

            for (let item of this.config) {

                const { field } = item;
                form[field] = {} as any
                form[field].value = item.value;
                form[field].rules = item.rules;
            }

            return form;
        },

        // 获取表单数据
        getFormData() {
            const { form } = this;
            const data: any = {}
            const keys = Object.keys(form);


            for (let key of keys) {
                data[key] = form[key].value
            }

            return data;
        },
        // 表单验证
        verify() {
            const { form } = this;
            const fields = Object.keys(form);

            for (let field of fields) {
                const { value, rules } = form[field];
                if (!rules) continue

                const result: VerifyResult = this.ruleVerify(value, rules)
                if (!result.status) {
                    if (value && rules.showPrompt !== undefined && rules.showPrompt) {
                        Toast(rules.errMessage);
                    }

                    this.$emit('fail', result)
                    return false
                }


            }
            return true;
        },

        ruleVerify(value: any, rules: VerifyConfig): VerifyResult {
            let result = { status: false, errMessage: '' }
            for (let rule of rules) {
                result = { status: false, errMessage: rule.errMessage || '' }
                // 验证必填
                if (rule.required) {
                    if (['', undefined, null].includes(value) || (Array.isArray(value) && value.length === 0)) {
                        return result
                    }
                }

                // 正则验证
                if (rule.pattern) {
                    if (!rule.pattern.test(value)) {
                        return result
                    }
                }

                if (rule.max) {
                    if (parseFloat(value) > rule.max) {
                        return result

                    }
                }
            }
            result.status = true;
            return result
        },

        getValue(key: string, type?: FormTypeEnum) {
            let item = (this.form as any)[key];

            if (type) {
                return item[type]
            }
            return item.value

        },
        /**
         * @description 重置表单数据
         *
         */
        reset() {
            const { form } = this;
            // debugger
            const keys = Object.keys(form);
            for (let key of keys) {
                const item = form[key]
                item.value = null
            }
        },


        onChange(type: FormTypeEnum, field: string, value: any) {
            // console.log('type', type, 'field', field, 'value', value)
            // debugger
            // console.log('form', this.form)

            // const obj = this.form[field];
            // obj.value = value

            this.$emit('change', this.getFormData())
        },


        getComponent(item: FormConfigItem) {

            switch (item.formType) {
                case FormTypeEnum.Checkbox:
                    return Checkbox;

                case FormTypeEnum.Radio:
                    return Checkbox;

                case FormTypeEnum.Input:
                    return Input;

                case FormTypeEnum.Textarea:
                    return TextArea;

                case FormTypeEnum.DateRange:
                    return DateRangePicker

                case FormTypeEnum.Datetime:
                    return DatetimePicker;

                case FormTypeEnum.Select:
                    return Select;

                case FormTypeEnum.Uploader:
                    return Uploader;

                default:
                    return Text;

            }

        },

        renderComponent() {
            const { config, form } = this;
            return config.map((item, index) => {

                item = item as FormConfigItem;
                // const slot = this.getSolts(item);
                const Comp: any = this.getComponent(item);

                // 处理单选框
                if (item.formType === FormTypeEnum.Radio) {
                    (item as CheckboxType).single = true;
                }

                item.value = this.getValue(item.field);
                // console.log('data',data);

                return <Comp
                    v-model:value={form[item.field].value}
                    onChange={(value: any) => this.onChange((item as FormConfigItem).formType, item.field, value)}
                    {...item}
                />


            });
        }
    },
    render() {
        return (
            <div>
                {this.renderComponent()}
            </div>
        )
    }
});