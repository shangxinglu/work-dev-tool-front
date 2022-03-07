import { defineComponent } from "vue";
// import style from "./index.module.less";
import List from '@/components/List'
import { AdvancedListProps, AdvancedListState, AdvancedListEmits } from './types'
import { getDataset } from '@/utils/helper'
export default defineComponent({
    props: AdvancedListProps,
    data() {
        return AdvancedListState();
    },
    emits: AdvancedListEmits,
    watch: {
        show() {
            if (this.show) {
                this.init?.();
                this.onLoad();
            }
        },
        params() {

            this.init();
            this.onLoad();
        }
    },
    methods: {
        init() {
            this.list = [];
            this.showEmpty = false;
            this.page = 1;
            this.finished = false;
        },

        onClickListItem(e: MouseEvent) {
            const eventType = getDataset(e, 'eventType');
            const index = getDataset(e, 'index');
            console.log(eventType, index);
            if (!index) return;

            this.$emit('click', {
                data: this.getListItem(index),
                index: index,
                eventType: eventType
            })

        },
        getListItem(index: number) {
            return this.list[index]
        },
        getListData() {
            return this.getData(this.page, Object.assign({}, this.params || {}));
        },
        onLoad() {
            // if (!this.show) return;

            this.getListData().then(data => {
                if (data.length === 0) {
                    this.finished = true;

                    if (this.list.length === 0) {
                        this.showEmpty = true;
                    }
                    return;
                }

                this.list.push(...data);
            });

            this.page++;


        },
        renderList() {
            return (
                <List className={this.className} finishedText={this.finishedText} emptyImage={this.emptyImage} showEmpty={this.showEmpty} emptyText={this.emptyText} selector={this.selector} onLoad={this.onLoad} finished={this.finished}>
                    {this.renderListItem()}
                </List>
            )
        },
        renderListItem() {
            return this.list.map((item, index: number) => this.$slots.item?.(item, index))
        },

    },
    render() {
        return (
            <div class={['h-full']} onClick={this.onClickListItem}>
                {this.renderList()}
            </div>
        )
    }
});