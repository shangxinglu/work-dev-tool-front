import { defineComponent } from "vue";
import style from "./index.module.less";
import Title from "../Title";
import { TitleProps } from "@/components/Title/types";
export default defineComponent({
    props: TitleProps,
    methods: {},
    render() {
        return (
            <div class={['p-15 border__radius bg-white', style['box']]}>
                <Title title={this.title} />
                {this.$slots.default?.()}
            </div>
        )
    }
});