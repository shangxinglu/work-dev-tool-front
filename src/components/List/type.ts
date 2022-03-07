import { ExtractPropTypes } from "vue"



export const ListPublicProps = {

    /**
        * @description 完全加载后的提示文案
        */
    finishedText: {
        type: String,
        default: '没有更多了'
    },
    /**
     * @description 使用选择器
     */
    selector: {
        type: String,
        default: ''
    },
    /**
     * @description 底部触发加载偏移量
     */
    offset: {
        type: Number,
        default: 50
    },
    /**
     * @description 空数据提示图标片
     */
    emptyImage: {
        type: String,
        default: ''
    },
    /**
     * @description 空数据提示文案
     */
    emptyText: {
        type: String,
        default: ''
    },
    /**
     * @description 列表的class
     */
    className: {
        type: String,
        default: ''
    }
}

export const ListProps = {
    ...ListPublicProps,

    load: {
        type: Boolean,
        default: true
    },
    /**
    * @description 是否全部加载完成
    */
    finished: {
        type: Boolean,
        default: false
    },

    /**
     * @description 显示空数据提示
     */
    showEmpty: {
        type: Boolean,
        default: false
    }
}

export type ListProps = ExtractPropTypes<typeof ListProps>