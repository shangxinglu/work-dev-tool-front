import { defineComponent } from "vue";
import "./app.less";

export default defineComponent({
    setup() {
        return () => (
            <div class={'app'}>
                <router-view />
                <router-view name="tabbar" />
            </div>
        )
    },
});
