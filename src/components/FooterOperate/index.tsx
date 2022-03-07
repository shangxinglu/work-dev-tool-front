import { defineComponent } from "vue";
import style from "./index.module.less";
import { FooterOperateProps } from './types'
export default defineComponent({
    props: FooterOperateProps,
    methods: {
        renderPlaceholder() {
            return <div class={[style['footer--placeholder']]}></div>
        }
    },
    render() {
        return (
            <div>
                <div class={['box-shadow', style.footer]}>
                    {this.$slots.default?.()}
                </div>
                {this.placeholder ? this.renderPlaceholder() : null}
            </div>
        )
    }
});