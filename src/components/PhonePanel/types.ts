
import { PropType } from "vue";

import type { ActionSheetAction } from 'vant'

export const PhonePanelProps = {
    phone: {
        type: Array as PropType<string[]>,
        default: () => []
    },
    show: {
        type: Boolean,
        default: false
    }
}

export type PhonePanelProps = PropType<typeof PhonePanelProps>;


export const PhonePanelEmits = {
    toggle: (show: boolean) => true,
    'update:show': (show: boolean) => true,
}

export interface PhonePanelState {
    actions: ActionSheetAction[],
}