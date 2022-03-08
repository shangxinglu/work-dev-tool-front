
import VueRouter from '@/router'
// import { getParamUrl } from '@/utils/util'

export const toHome = () => {
    VueRouter.push('/')
}

export const toTranslate = () => {
    VueRouter.push('/translate')
}