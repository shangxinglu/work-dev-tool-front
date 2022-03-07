import { PropType } from "vue";

export const InfoItemProps = {
    label: {
        type: String,
        default: ''
    },

    value: {
        type: String,
        default: ''
    },
}

export type InfoItemProps = PropType<typeof InfoItemProps>