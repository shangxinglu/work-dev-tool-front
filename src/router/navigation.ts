import { ProdTypeEnum } from '@/api'
import VueRouter from '@/router'
// import { getParamUrl } from '@/utils/util'

export const toHome = () => {
    VueRouter.push('/')
}

export const toMy = () => {
    VueRouter.push('/my')
}

export const toLogin = () => {
    VueRouter.push('/login')
}

export const toSearch = () => {
    VueRouter.push('/search')
}


export const toBuyList = () => {
    VueRouter.push('/buyList')
}

export const toBuyDetail = (id: string) => {
    VueRouter.push(`/buyDetail?id=${id}`)
}

export const toSellList = () => {
    VueRouter.push('/sellList')
}

export const toSellDetail = (id: string) => {
    VueRouter.push(`/sellDetail?id=${id}`)
}

export const toReleaseNeed = () => {
    VueRouter.push('/releaseNeed')
}

export const toReleaseResource = () => {
    VueRouter.push('/releaseResource')
}


export const toAddNeed = (type: ProdTypeEnum) => {
    VueRouter.push(`/addNeed?type=${type}`)
}

export const toAddResource = (type: ProdTypeEnum) => {
    VueRouter.push(`/addResource?type=${type}`)
}