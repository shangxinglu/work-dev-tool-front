import { PropType } from "vue";

export const RichProps = {
    text: {
        type: String as PropType<string>,
        default: '',
    }
}

export type RichProps = PropType<typeof RichProps>;