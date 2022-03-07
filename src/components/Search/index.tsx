import { defineComponent } from "vue";
import style from "./index.module.less";
import { Search, Empty } from "vant";
import Page from '@/components/Page'


import { antiShake, AntiShakeResult } from '@/utils/util'

import { getDataset } from '@/utils/helper'
import SearchHistory from "@/components/SearchHistory";
import { getSearchState, SearchProps } from './types'

export default defineComponent({
    emits: ['cancel', 'click'],
    props: SearchProps,
    data() {
        return getSearchState()
    },
    created() {
        const { handler, cancel }: AntiShakeResult = antiShake(this.getPromptData, 200, this)
        this.shakeHandler = handler
        this.shakeCancel = cancel
        // const {hender,cancel} = antiShake(this.onSearch,200,this)
    },
    watch: {
        searchText() {
            if (this.searchText.trim() === '') {
                this.onClear()
                return
            }
            this.shakeHandler()
        }
    },
    methods: {
        onCancel() {
            // console.log('取消');
            this.$emit('cancel')
        },
        async getPromptData() {
            const res = await this.getData(this.searchText)
            if (this.searchText.trim() === '') return;
            if (res.length === 0) {
                this.promptList = [];
                this.showEmpty = true;
                return;
            }
            this.showEmpty = false;

            this.promptList = res

        },
        /**
         * @description 清除搜索内容事件
         */
        onClear() {
            this.shakeCancel()
            this.promptList = []
            this.showEmpty = false;
        },
        onClickOptions(e: MouseEvent) {
            const index = getDataset(e, 'index')
            if (!index) return
            const item = this.promptList[index]
            this.$emit('click', item)
        },

        /**
         * @description 搜索事件
         */
        onSearch() {
            console.log('搜索', this.searchText);
            this.addRecordText = this.searchText

        },
        onClickLabel(label: string) {
            this.searchText = label
            this.onSearch()
        },
        onClickAdd() {

        },
        replaceSelectText(text: string) {
            return text.replace(this.searchText, '<span class="text-green">' + this.searchText + '</span>')

        },
        renderSearch() {
            return (
                <div class={[style['search']]}>
                    <Search leftIcon={this.searchIcon} onCancel={this.onCancel} clearable onSearch={this.onSearch} v-model={this.searchText} clear-trigger="always" show-action={true} placeholder={this.placeholder} />
                </div>
            )
        },

        renderPrompt() {
            if (this.showEmpty) {
                return (
                    <div class={[style['prompt']]}>
                        {this.renderEmpty()}
                    </div>
                )
            }

            if (this.promptList.length === 0) return ''
            const { searchText } = this

            return (
                <div onClick={this.onClickOptions} class={[style['prompt'], 'scroll__bar--clear']}>
                    {this.promptList.map((item, index) => this.renderItem?.(item, index, searchText))}
                </div>
            )
        },
        renderEmpty() {
            return [
                <Empty class={[this.emptyClassName]} image={this.emptyImage} description={this.emptyText} />,
                // <div onClick={this.onClickAdd} class={['button', style['add']]}>去添加主体</div>
            ]
        },

        renderHistory() {
            return (
                <div class={[style['history']]}>
                    <SearchHistory onClick={this.onClickLabel} text={this.addRecordText} />
                </div>
            )
        }
    },
    render() {
        return (
            <Page padding={0}>
                {this.renderSearch()}
                <div class={[style['content']]}>
                    {this.renderHistory()}
                    {this.renderPrompt()}
                </div>

            </Page>
        )
    }
});