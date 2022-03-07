import { defineComponent } from "vue";
import style from "./index.module.less";
import { Icon } from 'vant'
import { BackProps } from './types'

export default defineComponent({
    props: BackProps,
    methods: {
        onClickBack() {
            if (this.onBack) {
                this.onBack();
                return;
            }
            this.$router.back();
        }
    },
    render() {
        return (
            <div onClick={this.onClickBack} class={['flex--center', style['back']]}>
                <Icon class={['mr-3']} color="white" size={"15px"} name="arrow-left" />
            </div>
        )
    }
});