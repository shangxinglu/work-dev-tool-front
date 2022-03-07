import { defineComponent } from "vue";

import style from './index.module.less';
import { PageProps } from './types'

export default defineComponent({
  name: "Page",
  props: PageProps,
  data() {
    return {
      /**
       * @description 是否滚动到底部
       * 
       */
      isScrollBottom: false
    }
  },
  emits: ['scrollBottom', 'scroll'],
  mounted() {
    if (this.listenerScrollBottom || this.listenerScroll) {
      const el = this.$refs.page as Element;
      el.addEventListener('scroll', this.addEventListenerScroll)

    }
  },
  methods: {
    addEventListenerScroll(e: any) {
      const el = this.$refs.page as Element
      // const targetDis = el.scrollHeight - el.clientHeight - this.offsetBottom;
      // const currentDis = el.scrollTop;

      const { scrollHeight, scrollTop, clientHeight } = el;

      if ((scrollTop + clientHeight + this.offsetBottom) >= scrollHeight) {
        // if (currentDis >= targetDis) {
        if (!this.isScrollBottom) {
          this.isScrollBottom = true
          this.$emit('scrollBottom', true)
        }
      } else {
        if (this.isScrollBottom) {
          this.isScrollBottom = false
          this.$emit('scrollBottom', false)
        }
      }
      if (this.listenerScroll) {
        this.$emit('scroll', e)

      }
    }
  },
  render() {

    return (
      <div id={this.id} ref={'page'} class={[style.page, 'scroll__bar--clear', this.tabbar ? style['tabbar'] : '']} style={{ padding: this.padding, backgroundColor: this.bgColor }}>{this.$slots.default?.()}</div>
    )
  }

})