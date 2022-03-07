import { defineComponent } from "vue";

export interface TabConfigItem<P = any> {
    /**
     * @description 标题
     */
    title: string;
    /**
     * @description 列表项render函数
     */
    render: (item: any, index: number) => JSX.Element;
    /**
     * @description 数据获取行为
     */
    getData: GetListDataFn<any>;

    params?: P;
}

export default defineComponent({
    data() {
        return {
            activeTab: 0,
        }
    },
    methods: {
        onChangeTab(val: any) {
            this.activeTab = val.name;
        },
    },

});