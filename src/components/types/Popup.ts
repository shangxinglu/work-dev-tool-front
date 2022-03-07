import { ExtractPropTypes } from "vue"

export const PopupProps = {
    /**
     * @description 是否显示弹出框
     */
    show: {
        type: Boolean,
        default: false
    }
}

export type PopupProps = ExtractPropTypes<typeof PopupProps>