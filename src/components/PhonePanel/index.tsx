/**
 * @description 电话选择面板
 */



import { defineComponent } from "vue";
// import style from "./index.module.less";
import { ActionSheet, ActionSheetAction } from "vant";
import PopupBehavior from '@/behavior/popup'
import { PhonePanelEmits, PhonePanelProps, PhonePanelState } from "./types";
import { callUp } from "@/utils/util";

export default defineComponent({
    mixins: [PopupBehavior],
    props: PhonePanelProps,
    emits: PhonePanelEmits,
    data(): PhonePanelState {
        return {
            actions: this.initActions()
        }
    },
    watch: {
        phone(value: string[]) {
            this.actions = this.initActions()
        },

        show(show: boolean) {
            if (this.showPopup === show) return;
            this.showPopup = show;
        },
        showPopup(show: boolean) {
            if (this.show === show) return;
            // this.$emit('toggle', show);
            this.$emit('update:show', show);
        }
    },
    methods: {
        initActions() {
            return this.phone.map(item => {

                return {
                    name: item,
                }
            })
        },
        onClickOptions(action: ActionSheetAction, index: number) {
            // console.log(action, index);

            callUp(action.name!)
            this.$emit('update:show', false);
        },
    },
    render() {
        return (
            <ActionSheet cancel-text="取消" onSelect={this.onClickOptions} actions={this.actions} v-model:show={this.showPopup} ></ActionSheet>
        )
    }
});