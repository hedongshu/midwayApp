import { App, Config, Inject, Provide } from "@midwayjs/decorator";
import { Application } from "@midwayjs/web";
import { IPinduoduoBaseQuery } from "../interface";
import axios from 'axios'
import * as crypto from 'crypto'

interface IgetGoodsListFullQuery extends IPinduoduoBaseQuery {
    limit: number,
    offset: number
}

interface IgenerateQuery extends IPinduoduoBaseQuery {
    pid: string,
    generate_we_app: boolean,
    goods_sign: string,
    goods_id_list: string,
    custom_parameters: string
}


enum resource_type {
    "限时秒杀" = 4, '充值中心' = 39997, '活动转链' = 39998, '百亿补贴' = 39996, '领券中心' = 40000
}

@Provide()
export class PinduoduoService {

    @Config('pinduoduoConfig')
    pinduoduoConfig

    getSign(params: IPinduoduoBaseQuery): string {

        let client_secret = params.client_secret
        let clientSecret = client_secret
        let sorted = Object.keys(params).sort();
        let baseString = clientSecret;

        for (let i = 0, l = sorted.length; i < l; i++) {
            let k = sorted[i];

            let newString = params[k].toString()

            baseString += k + newString;
        }
        baseString += clientSecret;


        const md5 = crypto.createHash("md5",);

        return md5.update(baseString).digest("hex").toUpperCase();
    }


    /**
     * 获取拼多多商品列表
     * @param query 
     */
    async getGoodsList(query: { page: number, pageSize: number, sort_type: number, list_id?: string }) {

        let { page, pageSize, list_id, sort_type } = query
        page = Math.max(page - 1, 0)
        let limit = pageSize
        let offset = page * limit

        let fullQuery: IgetGoodsListFullQuery = {
            client_id: this.pinduoduoConfig.client_id,
            client_secret: this.pinduoduoConfig.client_secret,
            p_id: this.pinduoduoConfig.p_id,
            type: 'pdd.ddk.top.goods.list.query',
            timestamp: new Date().getTime(),
            limit: limit,
            offset: offset,
            sort_type: sort_type
        }

        if (list_id) fullQuery.list_id = list_id

        fullQuery.sign = this.getSign(fullQuery)

        try {
            let res1 = await axios.post(this.pinduoduoConfig.url, fullQuery)
            let list = res1.data.top_goods_list_get_response.list
            let listId = res1.data.top_goods_list_get_response.list_id

            let goodsList = []
            for (const item of list) {
                let generateQuery: IgenerateQuery = {
                    client_id: this.pinduoduoConfig.client_id,
                    client_secret: this.pinduoduoConfig.client_secret,
                    p_id: this.pinduoduoConfig.p_id,
                    pid: this.pinduoduoConfig.p_id,
                    type: 'pdd.ddk.goods.promotion.url.generate',
                    timestamp: new Date().getTime(),
                    custom_parameters: JSON.stringify({
                        pid: this.pinduoduoConfig.p_id,
                        uid: this.pinduoduoConfig.bined_uid
                    }),
                    goods_sign: item.goods_sign,
                    goods_id_list: JSON.stringify([item.goods_id]),
                    generate_we_app: true
                };

                generateQuery['sign'] = this.getSign(generateQuery);

                let detail = await axios.post(this.pinduoduoConfig.url, generateQuery);

                let goodsInfo = detail.data.goods_promotion_url_generate_response.goods_promotion_url_list[0]

                goodsList.push(Object.assign({}, goodsInfo, item))
            }
            return { goodsList, listId }
        } catch (error) {
            return error
        }



    }


    /**
     * 获取拼多多,活动频道列表
     */
    async getActivityUrl() {

        let fullQuery: IPinduoduoBaseQuery = {
            client_id: this.pinduoduoConfig.client_id,
            client_secret: this.pinduoduoConfig.client_secret,
            p_id: this.pinduoduoConfig.p_id,
            type: 'pdd.ddk.resource.url.gen',
            timestamp: new Date().getTime(),
            pid: this.pinduoduoConfig.p_id,
            generate_we_app: true,
        }

        try {
            let resource_type_array = [resource_type.百亿补贴, resource_type.限时秒杀, resource_type.领券中心]

            let result_res = []
            for (let index = 0; index < resource_type_array.length; index++) {

                const resourceType = resource_type_array[index];

                let theQuery = Object.assign({}, fullQuery, { resource_type: resourceType })
                theQuery['sign'] = this.getSign(theQuery)

                let urlRes = await axios.post(
                    "https://gw-api.pinduoduo.com/api/router",
                    theQuery
                )

                result_res.push(Object.assign(urlRes.data.resource_url_response, { type: resource_type[resourceType] }))
            }

            return result_res
        } catch (error) {
            return error
        }

    }

}