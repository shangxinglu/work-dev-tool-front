import { defineComponent } from "vue";
import style from "./index.module.less";
import { Cell } from "vant";
import Page from "@/components/Page";
import { toTranslate } from "@/router/navigation";

export default defineComponent({
    methods: {
        getListConfig() {
            return [
                {
                    title: "翻译",
                    value: "",
                    onClick: () => {
                        toTranslate()
                    }
                },
                {
                    title: "标题",
                    value: "",
                    onClick: () => {

                    }
                }
            ]
        }
    },
    render() {
        return (
            <Page padding={0}>
                {this.getListConfig().map(item => <Cell {...item} />)}
            </Page>
        )
    }
});