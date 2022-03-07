import { defineComponent } from "vue";
import style from "./index.module.less";
import { Popup, Tabbar, TabbarItem } from 'vant';
import { setConfig, TabbarState } from './types'

import PopupBehavior from '@/behavior/popup'
import Release from '@/components/Release'

import HomeImg from './assets/home.png'
import SelectHomeImg from './assets/home-select.png'
import MyImg from './assets/my.png'
import SelectMyImg from './assets/my-select.png'
import BuyImg from './assets/buy.png'
import SelectBuyImg from './assets/buy-select.png'
import SellImg from './assets/sell.png'
import SelectSellImg from './assets/sell-select.png'
import ReleaseImg from './assets/release.png'

export default defineComponent({
    mixins: [PopupBehavior],
    data(): TabbarState {
        return {
            activeUrl: '',
            config: [
                {
                    icon: HomeImg,
                    selectIcon: SelectHomeImg,
                    url: '/',
                    text: '首页',
                    isShowRedDot: false

                },


                {
                    icon: BuyImg,
                    selectIcon: SelectBuyImg,
                    url: '/buyList',
                    text: '求购',
                    isShowRedDot: false

                },
                {
                    icon: ReleaseImg,
                    selectIcon: ReleaseImg,
                    url: '',
                    text: '',
                    isShowRedDot: false,
                    iconClassName: style['icon--1'],
                    click: this.onClickRelease?.bind(this),

                },
                {
                    icon: SellImg,
                    selectIcon: SelectSellImg,
                    url: '/sellList',
                    text: '出售',
                    isShowRedDot: false

                },

                {
                    icon: MyImg,
                    selectIcon: SelectMyImg,
                    url: '/my',
                    text: '我的',
                    isShowRedDot: false

                },
            ],

        }
    },
    created() {
        setConfig(this.config)
        for (let item of this.config) {
            if (this.getIsSelect(item.url)) {
                this.activeUrl = item.url
            }
        }
    },

    methods: {
        onClickRelease() {
            this.setShowPopup()
        },

        /**
         * @description 判断是否选中
         *
         */
        getIsSelect(path: string) {
            const { hash } = location
            const url = path = hash.replace(/#(.*?)\?/, '$1')

            return url === path
        },
        renderRelease() {
            return (
                <Popup round position="bottom" v-model:show={this.showPopup}>
                    <Release />
                </Popup>
            )
        },
        renderTarItem() {

            return (
                this.config.map((item) => {

                    return (
                        <TabbarItem
                            v-slots={
                                {
                                    icon: ({ active }: { active: boolean }) => {
                                        // console.log(active);

                                        return (
                                            <img onClick={item.click} class={[item.iconClassName || '']} src={active ? item.selectIcon : item.icon} />
                                        )
                                    }
                                }
                            }
                            dot={item.isShowRedDot}
                            to={item.url}
                            name={item.text}
                        >{item.text}</TabbarItem>
                    )
                })
            )
        },
    },
    render() {
        return (
            <Tabbar class={[style['tabbar']]} fixed border={false} route placeholder v-model={this.activeUrl}>
                {this.renderTarItem()}
                {this.renderRelease()}
            </Tabbar>
        )
    }
});