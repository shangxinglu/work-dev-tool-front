import { defineComponent } from "vue";
import style from "./index.module.less";
import { RichProps } from './types'

export default defineComponent({
    props: RichProps,
    methods: {
        getInnerHtml() {
            let { text } = this;
            return text;
        }
    },
    render() {
        return (
            <div class={[style['rich']]} v-html={this.getInnerHtml()}></div>
        )
    }
});