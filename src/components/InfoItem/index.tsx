import { defineComponent } from "vue";
// import style from "./index.module.less";
import { InfoItemProps } from './types'
export default defineComponent({
    props: InfoItemProps,
    methods: {
        renderLabel() {
            return (
                <div class={['mr-10 text-grey']}>{this.label}</div>
            )
        },
        renderValue() {
            return (
                <div class={['flex-1 text-black']}>{this.value}</div>
            )
        }
    },
    render() {
        return (
            <div class={['flex--center--v font--t5']}>
                {this.renderLabel()}
                {this.renderValue()}
            </div>
        )
    }
});