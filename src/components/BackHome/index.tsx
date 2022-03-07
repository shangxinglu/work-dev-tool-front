import { defineComponent } from "vue";
import style from "./index.module.less";
import BackHomeImg from "./assets/back-home.png";
import { toHome } from "@/router/navigation";
import { BackHomeProps } from './types'

export default defineComponent({
    props: BackHomeProps,
    methods: {
        onClick() {
            if (this.toHome) {
                this.toHome();
                return;
            }

            toHome();
        }
    },
    render() {
        return (
            <img onClick={this.onClick} class={[style['button'], style['img--1']]} src={BackHomeImg} />
        )
    }
});