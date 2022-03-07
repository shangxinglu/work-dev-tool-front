import { PropType } from "vue";

export const TitleProps = {
    title: {
        type: String,
        default: ''
    }
}

export type TitleProps = PropType<typeof TitleProps>