import { PropType } from "vue";

import { ListPublicProps } from '@/components/List/type'

export const AdvancedListProps = {

    ...ListPublicProps,

    /**
     * @description 获取数据
     */
    getData: {
        type: Function as PropType<GetListDataFn<any>>,
        default: () => []
    },
    /**
     * @description 请求参数
     */
    params: {
        type: Object as PropType<any>,
        default: () => ({})
    },
    /**
     * @description 显示状态
     */
    show: {
        type: Boolean,
        default: true
    }
}

export type AdvancedListProps = PropType<typeof AdvancedListProps>;

interface AdvancedListState {
    list: any[];
    /**
     * @description 全部加载
     */
    finished: boolean;
    /**
     * @description 显示空提示
     */
    showEmpty: boolean;
    /**
     * @description 当前页数
     */
    page: number;
    /**
     * @description 每页条数
     */
    pageSize: number;
}

export const AdvancedListState = (): AdvancedListState => {
    return {
        list: [],
        finished: false,
        showEmpty: false,
        page: 1,
        pageSize: 20,
    }
}

export const AdvancedListEmits = {
    click: (data: EventData) => true
}

export interface EventData {
    data: any;
    index: number;
    eventType: string;
}