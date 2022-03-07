import { defineComponent } from "vue";
// import style  from "./index.module.less"
interface PopupState {
    showPopup: boolean;
}

export default defineComponent({
    data(): PopupState {
        return {
            showPopup: false,
        }
    },
    methods: {
        setShowPopup() {
            this.showPopup = true;
        },
        setHidePopup() {
            this.showPopup = false;
        }
    }

});