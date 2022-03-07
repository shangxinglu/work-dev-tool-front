import { PropType } from "vue"

export const BackHomeProps = {
    /**
     * @description 自定义返回事件
     */
    toHome: {
        type: Function,
    }
}

export type BackHomeProps = PropType<typeof BackHomeProps>