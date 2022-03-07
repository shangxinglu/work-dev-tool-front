import { defineComponent } from "vue";
import style from "./index.module.less";
import {
    DropdownItemProps,
    getDropdownItemState,
    DropdownBarType,
    OptionsSortItem,
    OptionsDropdownItem,
    SortType,
    DropdownItemExpose,
    DropdownItemEmits
} from './types';

import { DropdownItem, } from "vant";

export default defineComponent({
    props: DropdownItemProps,
    data() {
        return getDropdownItemState();
    },
    emits: DropdownItemEmits,
    watch: {
        isExpand(val: boolean) {
            this.$emit('toggle', val)
        }
    },
    methods: {
        getTitle() {
            return this.title;
        },

        onClickItem() {
            const strategy: Record<DropdownBarType, any> = {
                [DropdownBarType.sort]: this.onClickSortItem,
                [DropdownBarType.dropdown]: this.onClickDropdownItem,
                [DropdownBarType.filter]: this.onClickfilterItem,
            }
            strategy[this.type]();
        },
        onClickSortItem() {

        },
        onClickDropdownItem() {
            this.isExpand = !this.isExpand;
        },
        onClickfilterItem(isExpand: boolean) {
            this.isExpand = isExpand;

        },
        changeSortState() {
            const strategy: Record<SortType, SortType> = {
                [SortType.reverse]: SortType.default,
                [SortType.default]: SortType.positive,
                [SortType.positive]: SortType.reverse,
            }
            const options = this.options as OptionsSortItem[];
            const currentSortType = strategy[this.currentSortType];

            for (let item of options) {
                if (item.type === currentSortType) {
                    this.value = item.value;
                    break;
                }
            }
            this.currentSortType = currentSortType;
            this.$emit('change', this.value)
        },
        onOpenSort() {
            const sortRef = this.$refs.sort as DropdownItemExpose;
            sortRef.state.showWrapper = false;
            sortRef.state.showPopup = false;
            this.changeSortState();

        },

        toggle(display?: boolean) {
            (this.$refs.dropdown as any)?.toggle?.(display);
        },

        renderItem() {
            const strategy: Record<DropdownBarType, any> = {
                [DropdownBarType.sort]: this.renderSortItem,
                [DropdownBarType.dropdown]: this.renderDropdownItem,
                [DropdownBarType.filter]: this.renderFilterItem,
            }
            return strategy[this.type]();
        },

        renderSortItem() {
            const className = style[`sort--${this.currentSortType}`]
            return (
                <DropdownItem title-class={[className]} ref={'sort'} title={this.title} onOpen={this.onOpenSort}></DropdownItem>
            )
        },
        renderDropdownItem() {
            return (
                <DropdownItem title={this.title} options={this.options as OptionsDropdownItem[]}></DropdownItem>
            )
        },
        renderFilterItem() {
            return (
                <DropdownItem onOpen={() => this.onClickfilterItem(true)} onClosed={() => this.onClickfilterItem(false)} ref="dropdown" title={this.title}>
                    {this.$slots?.default?.()}
                </DropdownItem>
            )
        }

    },
    render() {
        return this.renderItem();
    }
});