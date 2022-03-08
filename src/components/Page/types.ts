import { ExtractPropTypes } from "vue"

export const PageProps = {
    id: {
        type: String,
        default: ''
    },
    padding: {
        type: [Number, String],
    },
    bgColor: {
        type: String,
        default: '#f4f4f4'
    },
    /**
     * @description 是否是tabbar页面
     */
    tabbar: {
        type: Boolean,
        default: false,
    },
    /**
     * @description 是否监听元素是否滚动底部
     */
    listenerScrollBottom: {
        type: Boolean,
        default: false
    },
    /**
     * @description 监听滚动
     */
    listenerScroll: {
        type: Boolean,
        default: false
    },

    /**
     * @description 距离到底部多少像素算滚动到底部
     */
    offsetBottom: {
        type: Number,
        default: 0
    }
}

export type PageProps = ExtractPropTypes<typeof PageProps>