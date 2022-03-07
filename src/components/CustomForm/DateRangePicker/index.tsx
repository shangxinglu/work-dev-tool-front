import { defineComponent, PropType } from "vue";
import style from "./index.module.less";
import { DatetimePicker, Popup } from "vant";
import PopupBehavior from '@/behavior/popup'
import { TimeType, DateRangePickerData, DateRangePickerProps } from './types'
import moment from "moment";
import { getSize } from '@/command/apiTool'




export default defineComponent({
    mixins: [PopupBehavior],
    props: DateRangePickerProps,
    data(): DateRangePickerData {
        return {
            date: [],
            currentType: TimeType.Start,
        }
    },
    created() {
        this.initDate();

    },
    emits: ["change", 'update:value'],
    watch: {
        value() {
            if (['', null, undefined].includes(this.value as any)) {

                this.date = [this.valueToDate(), undefined] as [Date?, Date?] | [string?, string?]
                return
            }

            const [startVal, endVal] = this.value,
                [start, end] = this.date;


            if (!this.isEqual(startVal, start)) {
                this.date[0] = this.valueToDate(startVal);
            }

            if (!this.isEqual(endVal, end)) {
                this.date[1] = this.valueToDate(endVal);
            }

        }
    },
    methods: {
        dateTypeisDate(): boolean {
            if (['date', 'datetime'].includes(this.dateType)) {
                return true;
            }

            return false;
        },
        initDate() {
            const { value, date } = this;
            if (value?.[1]) {
                date[1] = this.valueToDate(value[1])
            }
            if (value?.[0]) {
                date[0] = this.valueToDate(value[0])
            } else {
                date[0] = this.valueToDate()
                this.emitChange();
            }

        },
        dateToValue(value: Date | string | undefined): string {
            if (value) {
                if (this.dateTypeisDate()) {

                    return moment(value).format("YYYY-MM-DD");
                } else {
                    return value as string;

                }
            } else {
                return '';
            }

        },
        valueToDate(value?: Date | string): Date | string {

            if (!value) {
                if (this.dateTypeisDate()) {
                    return new Date
                } else {
                    return moment().format('HH:mm')
                }
            }
            if (this.dateTypeisDate()) {
                return moment(value).toDate()
            }

            return value;
        },
        isEqual(value: string | undefined, date: Date | string | undefined) {
            if (this.dateTypeisDate()) {
                return value === this.dateToValue(date);

            } else {
                return value === date;
            }

        },
        onConfirm(value: Date | string) {
            console.log(value);
            const type = this.currentType

            if (type === TimeType.Start) {
                this.date[0] = this.valueToDate(value);


            } else if (type === TimeType.End) {
                this.date[1] = this.valueToDate(value);
            }


            this.emitChange();
            this.setHidePopup();


        },
        onCancel() {
            this.setHidePopup();
        },
        onClickInput(type: TimeType) {
            if (this.disabled) return
            this.setShowPopup();
            this.currentType = type;

            if (type === TimeType.End) {
                if (!this.value?.[1]) {

                    this.date[1] = this.valueToDate();
                    console.log(this.date[1])
                    this.emitChange();
                }

            }
        },

        emitChange() {
            const [start, end] = this.date;
            const val = [this.dateToValue(start), this.dateToValue(end)]

            this.$emit('change', val);
            this.$emit('update:value', val);
        },
        renderPopup() {
            return (
                <Popup position="bottom" v-model:show={this.showPopup}>
                    {this.renderDateRangePicker()}
                </Popup>
            )
        },
        renderDateRangePicker() {

            if (this.currentType === TimeType.Start) {
                return <DatetimePicker type={this.dateType} onCancel={this.onCancel} onConfirm={this.onConfirm} swipeDuration={500} itemHeight={getSize(30)} v-model={this.date[0]} show-toolbar={true} key={this.currentType} />
            } else if (this, this.currentType === TimeType.End) {
                return <DatetimePicker type={this.dateType} onCancel={this.onCancel} onConfirm={this.onConfirm} swipeDuration={500} itemHeight={getSize(30)} v-model={this.date[1]} show-toolbar={true} key={this.currentType} />
            }

            return ''

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
            return (
                <div class={['vant__label ', this.required ? 'vant__label--required' : '', style.label]}>{this.label}</div>
            )
        },
        renderInput() {
            return (
                <div class={['flex--center--v font--t5 flex-1']}>
                    <div class={['flex-1 flex--center', style['input']]} onClick={() => this.onClickInput(TimeType.Start)}>
                        {this.value?.[0] ? <div>{this.value[0]}</div> : <div class={[style['input--placeholder']]}>{this.minDatePlaceholder}</div>}
                    </div>
                    <div class={[' mx-4 leading-none']}>-</div>
                    <div class={['flex-1 flex--center', style['input']]} onClick={() => this.onClickInput(TimeType.End)}>
                        {this.value?.[1] ? <div>{this.value[1]}</div> : <div class={[style['input--placeholder']]}>{this.maxDatePlaceholder}</div>}
                    </div>
                </div>
            )
        }
    },
    render() {
        return (
            <div class={['py-12', style['datetime']]}>
                {this.renderField()}
                <div>
                    {this.renderPopup()}

                </div>
            </div>
        )
    }
});