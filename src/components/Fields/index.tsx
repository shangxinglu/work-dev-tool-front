import { defineComponent } from "vue"
import style from "./index.module.less"
import { Field } from 'vant';
export default defineComponent({
    name: "Fields",
    data() {
        return {
            name: this.dataList.value || "",
        }
    },
    props: {
        dataList: {
            type: Object,
            default: () => {
                return {}
            }
        }
    },
    emits: ["change"],
    render() {
        return (
            <Field
                v-model={this.name}
                {...this.dataList}
                v-slots={{
                    button: () => <div>{this.dataList.unit}</div>
                }}
            />
        )
    }
})