// 统计关键数据
declare interface KeyData {
    text: string;
    num: number;
    unit?: string;

}

declare type GetListDataFn<T, P = any> = (page: number, params: P) => Promise<T[]>

declare type GetSearchDataFn<T> = (searchText: string) => Promise<T[]>


/**
 * @description 策略类型
 */
declare type Strategy<Type, ValueType> = {
    [k in keyof Type]: ValueType;
}

