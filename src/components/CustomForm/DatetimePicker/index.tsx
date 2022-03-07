import { defineComponent } from "vue";
import style from "./index.module.less";

import { DatetimePickerProps, DatetimePickerState, DatetimePickerEmits, DateDataType } from './types'
import { Popup, Icon, DatetimePicker } from "vant";
import PopupBehavior from '@/behavior/popup'
import moment from "moment";
import { getSize } from '@/command/apiTool'

export default defineComponent({
    mixins: [PopupBehavior],

    props: DatetimePickerProps,
    emits: DatetimePickerEmits,
    data(): DatetimePickerState {
        return {
            date: this.initDate(),
        }
    },
    watch: {
        value(val: any) {
            if ([null, undefined].includes(val)) {
                val = '';
            }
            if (this.date !== val) {
                this.date = this.initDate();
            }
        },
    },
    methods: {
        initDate(): Date | string {
            if (this.value) {
                if (this.dateType === 'time') {
                    return this.value
                } else {
                    return moment(this.value).toDate()
                }
            } else {
                if (this.dateType === 'time') {

                    return moment().format('HH:mm')

                }
                return new Date
            }
        },
        onClick() {
            if (this.disabled) return
            this.setShowPopup();
        },
        formatDate(date: Date) {
            const strategy: Record<DateDataType, string> = {
                date: 'YYYY-MM-DD',
                time: 'HH:mm:ss',
                datetime: 'YYYY-MM-DD HH:mm:ss',
            }
            const currentFormat = strategy[this.dateType];
            return moment(date).format(currentFormat)
        },
        emitChange() {
            let value: string;
            if (this.dateType === 'time') {
                value = this.date as string
            } else {
                value = this.formatDate(this.date as Date)

            }
            this.$emit('update:value', value)
            this.$emit('change', value);

        },
        onConfirm(value: Date | string) {
            console.log(value);

            this.date = value;
            this.emitChange();
            this.setHidePopup();
        },
        onCancel() {
            this.setHidePopup();
        },
        renderField() {
            return (
                <div class={['flex--center--v']}>
                    {this.renderInterLabel()}
                    {this.renderInput()}
                </div>
            )
        },
        renderInterLabel() {
            if (this.renderLabel) {
                return this.renderLabel(this.label)
            }
            return (
                <div class={['vant__label ', this.required ? 'vant__label--required' : '', style.label]}>{this.label}</div>
            )
        },
        renderInput() {


            return (
                <div onClick={this.onClick} class={['flex--center--v font--t5 flex-1']}>

                    <div class={['flex-1', this.value ? 'text-black' : ' text-neutral-9']}>{this.value || this.placeholder}</div>
                    <div class={['pl-5']}><Icon name="arrow" size={10}></Icon></div>
                </div>
            )
        },
        renderPopup() {
            return (
                <Popup position="bottom" v-model:show={this.showPopup}>
                    <DatetimePicker onCancel={this.onCancel} onConfirm={this.onConfirm} swipeDuration={500} itemHeight={getSize(30)} v-model={this.date} show-toolbar={true} type={this.dateType} />
                </Popup>
            )
        },

    },
    render() {
        return (
            <div class={['py-12', style['datetime']]}>
                {this.renderField()}
                {this.renderPopup()}

            </div>
        )
    }
});