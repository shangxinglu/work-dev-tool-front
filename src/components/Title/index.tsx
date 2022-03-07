import { defineComponent } from "vue";
import style from "./index.module.less";
import { TitleProps } from './types'
export default defineComponent({
    props: TitleProps,
    methods: {
        renderUnderLine() {
            return (
                <div class={[style['underline']]}></div>
            )
        },
        renderTitle() {
            return <div class={[' relative z-10 font--t7 text-black']}>{this.title}</div>
        }
    },
    render() {
        return (
            <div class={['relative']}>
                {this.renderTitle()}
                {this.renderUnderLine()}
            </div>
        )
    }
});