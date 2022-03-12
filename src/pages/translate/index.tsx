import { dealzhToZh, TranslateState } from "@/api/translate";
import Fields from "@/components/Fields";
import Page from "@/components/Page";
import { copy } from "@/utils/util";
import { Button, Field, RadioGroup, Radio, Cell } from "vant";
import { defineComponent } from "vue";
import style from "./index.module.less";



export default defineComponent({
    data(): TranslateState {
        return {
            text: "",
            result: "",
            bigHump: '',
            smallHump: '',
            crossbar: ''
        }
    },
    methods: {
        onCopy(text: string) {
            copy(text)
        },
        onClickTranslate() {
            dealzhToZh.call(this);
        },
        onClickClear() {
            this.text = '';
        },
        getTypeConfig() {
            return [
                {
                    title: "小驼峰",
                    value: this.smallHump
                },
                {
                    title: "大驼峰",
                    value: this.bigHump
                },
                {
                    title: "-链接",
                    value: this.crossbar
                },



            ]
        },
        renderInput() {
            return <Field autosize={{ maxHeight: 100, minHeight: 100 }} v-model={this.text} type="textarea" />
        },


        renderButton() {
            return (
                <div class={['my-15 flex--center--v']}>
                    <Button type="primary" onClick={this.onClickTranslate}>转化</Button>
                    <div class={['ml-15']}>
                        <Button type="danger" onClick={this.onClickClear}>清除</Button>
                    </div>
                    <div class={['ml-15']}>
                        <Button type="primary" onClick={() => this.onCopy(this.text)}>复制</Button>
                    </div>


                </div>
            )
        },
        renderResult() {

            return (
                <div>
                    {this.getTypeConfig().map(item => {
                        return (
                            <div class={['mt-15  ']}>
                                <div>{item.title}</div>
                                <div class={['mt-10 p-15 bg-white ', style.result]}>{item.value}</div>
                                <div class={['mt-10']}>
                                    <Button onClick={() => this.onCopy(item.value)}>复制</Button>
                                </div>
                            </div>
                        )
                    })}

                </div>
            )

        }
    },
    render() {
        return (
            <Page>
                {this.renderInput()}
                {this.renderButton()}
                {this.renderResult()}
            </Page>
        )
    }
});