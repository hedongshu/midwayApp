/**
 * @description User-Service parameters
 */
export interface IUserOptions {
    uid: number;
}


enum PinduoduoApiType { 'pdd.ddk.top.goods.list.query', 'pdd.ddk.goods.search', 'pdd.ddk.resource.url.gen' };

export interface IPinduoduoBaseQuery {
    client_id: number,
    client_secret: number,
    p_id: number,
    type: PinduoduoApiType,
    timestamp: Date
}