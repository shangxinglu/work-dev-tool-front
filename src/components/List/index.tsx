import { defineComponent } from "vue";
// import {List} from 'vant'
import { Empty } from "vant";
import style from "./index.module.less";
import { ListProps } from './type'
export default defineComponent({
    props: ListProps,
    created() {
        this.onLoad();
    },
    mounted() {
        this.addEventListener();
    },
    watch: {
        finished(val) {
            if (val) {
                this.removeEventListener();
            } else {
                this.addEventListener();
            }
        }
    },
    emits: ['load'],
    methods: {
        getListElement() {
            if (this.selector) {
                return document.querySelector(this.selector) as HTMLElement;
            }
            return this.$refs.list as HTMLElement;
        },
        addEventListener() {
            const el = this.getListElement();

            el.addEventListener("scroll", this.onScroll);
        },
        removeEventListener() {
            const el = this.getListElement();
            el.removeEventListener("scroll", this.onScroll);
        },
        onScroll() {
            const el = this.getListElement();

            const { scrollHeight, scrollTop, clientHeight } = el;
            if ((scrollTop + clientHeight + this.offset) >= scrollHeight) {
                this.onLoad();
            }
        },
        onLoad() {
            // alert('onLoad')
            this.$emit('load');
        },
        renderFinshedText() {
            if (this.showEmpty) return ''
            if (this.finished) {
                return (
                    <div class={['m-15 pb-15 font--t3 text-neutral-9 text-center']}>{this.finishedText}</div>
                )
            }

            return '';
        },
        renderEmpty() {
            if (!this.showEmpty) return ''
            return (
                <Empty class={['vant__empty']} image={this.emptyImage} description={this.emptyText} />
            )
        }
    },
    render() {
        return (
            <div ref="list" class={[this.selector ? '' : style.list, 'scroll__bar--clear']}>
                <div class={[this.className,]}>
                    {this.$slots.default?.()}

                </div>
                {this.renderFinshedText()}
                {this.renderEmpty()}
            </div>
        )
    }
});