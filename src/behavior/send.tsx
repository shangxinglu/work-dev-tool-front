import { defineComponent } from "vue";
import style from "./index.module.less";
export interface SendBehaviorState {
    /**
     * @description 手机号
     */
    phone: string;
    /**
     * @description 发送文字
     */
    sendText: string;
    /**
     * @description 发送冷却时间
     */
    sendTime: number;
    /**
     * @description 倒计时计时器
     */
    sendTimer: number | null;
    /**
     * @description 当前冷却时间
     */
    currentTime: number;
}

export default defineComponent({
    data(): SendBehaviorState {
        return {
            sendText: '获取验证码',
            sendTime: 60,
            sendTimer: null,
            currentTime: 0,
            phone: ''
        }
    },
    deactivated() {
        if (this.sendTimer) {
            clearInterval(this.sendTimer);
        }
    },
    methods: {
        startCount() {
            if (!this.phone) return;
            if (this.sendTimer) return;
            this.currentTime = this.sendTime;
            this.sendTimer = setInterval(() => {
                this.currentTime--;
                this.sendText = `(${this.currentTime}s)后重新发送`;
                if (this.currentTime <= 0) {
                    clearInterval(this.sendTimer!);
                    this.sendTimer = null;
                    this.sendText = '获取验证码';
                }
            }, 1000)
        }
    },

});