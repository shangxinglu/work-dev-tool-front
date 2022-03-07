import { PropType } from "vue"

export const BackProps = {
    /**
     * @description 自定义返回事件
     */
    onBack: {
        type: Function,
    }
}

export type BackProps = PropType<typeof BackProps>