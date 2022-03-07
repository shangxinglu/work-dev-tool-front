import { ProdTypeEnum } from "@/api";
import { PriceTypeEnum } from "@/api/buyList";

import { formatMoney } from "@/utils/util";

export const getPriceText = (type: PriceTypeEnum, minPrice?: number, maxPrice?: number) => {

    const priceMin = formatMoney(minPrice || 0);
    const priceMax = formatMoney(maxPrice || 0);

    const strategy: Record<PriceTypeEnum, string> = {
        [PriceTypeEnum.UnitPrice]: `${priceMin.money}${priceMin.unit}`,
        [PriceTypeEnum.Interval]: `${priceMin.money}${priceMin.unit} ~ ${priceMax.money}${priceMax.unit}`,
        [PriceTypeEnum.Negotiable]: '面议',
    }

    return strategy[type];
}

export const prodTypeEnumToText = (type: ProdTypeEnum) => {
    const strategy: Record<ProdTypeEnum, string> = {
        [ProdTypeEnum.AgriculturalProducts]: '农产品',
        [ProdTypeEnum.AgriculturalMachinery]: '农机',
        [ProdTypeEnum.AgriculturalMaterials]: '农资',
        [ProdTypeEnum.Work]: '工作',
    }
    return strategy[type];
}

export const formatDate = (date: string) => {
    return date.split(' ')[0]
}

