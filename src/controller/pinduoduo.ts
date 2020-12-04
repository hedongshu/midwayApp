import { ALL, Controller, Get, Inject, Post, Provide, Query } from "@midwayjs/decorator";
import { Context } from "egg";
import { PinduoduoService } from "../service/pinduoduo";

@Provide()
@Controller('/api/pinduoduo')
export class PinduoduoController {

    @Inject()
    ctx: Context;

    @Inject()
    pinduoduoService: PinduoduoService

    @Get('/get_goods_list')
    async get_goods_list(@Query() page = 1, @Query() pageSize = 10, @Query() listID = undefined, @Query() sortType = 1) {

        const goodsList = await this.pinduoduoService.getGoodsList({
            page: page,
            pageSize: pageSize,
            list_id: listID,
            sort_type: sortType
        })

        if (goodsList.success) {
            return Object.assign(goodsList, {
                message: 'OK'
            })
        } else {
            return {
                success: goodsList.success,
                message: goodsList.data
            }
        }

    }


    @Get('/get_activity_url')
    async get_activity_url(@Query(ALL) query) {

        const urlList = await this.pinduoduoService.getActivityUrl()

        if (urlList.success) {
            return Object.assign(urlList, {
                message: 'OK'
            })
        } else {
            return {
                success: urlList.success,
                message: urlList.data
            }
        }
    }


    @Get('/get_search_goods')
    async get_search_goods(@Query() keyword = '', @Query() page = 1, @Query() pageSize = 10, @Query() listId, @Query() sort_type = 0) {

        const goodsList = await this.pinduoduoService.getSearchGoods({
            keyword,
            page,
            page_size: pageSize,
            sort_type,
            list_id: listId
        })

        if (goodsList.success) {
            return Object.assign(goodsList, {
                message: 'OK'
            })
        } else {
            return {
                success: goodsList.success,
                message: goodsList.data
            }
        }
    }

}
