export type PinduoduoApiType = 'pdd.ddk.top.goods.list.query' | 'pdd.ddk.goods.search' | 'pdd.ddk.resource.url.gen' | 'pdd.ddk.goods.promotion.url.generate'

/**
 * @description User-Service parameters
 */
export interface IUserOptions {
    uid: number;
}

export interface IPinduoduoBaseQuery {
    client_id: string,
    client_secret: string,
    p_id: string,
    type: PinduoduoApiType,
    timestamp: number,
    [propName: string]: string | number | boolean;
}