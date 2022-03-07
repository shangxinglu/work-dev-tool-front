import { ExtractPropTypes } from "vue";




export const FooterOperateProps = {
    placeholder: {
        type: Boolean,
        default: false
    },

}

export type FooterOperateProps = ExtractPropTypes<typeof FooterOperateProps>;