import { ALL, Controller, Inject, Post, Provide, Query } from "@midwayjs/decorator";
import { Context } from "egg";
import { PinduoduoService } from "../service/pinduoduo";

@Provide()
@Controller('/api/pinduoduo')
export class PinduoduoController {

    @Inject()
    ctx: Context;

    @Inject()
    pinduoduoService: PinduoduoService

    @Post('/get_goods_list')
    async get_goods_list(@Query() page = 1, @Query() pageSize = 10, @Query() listID = undefined, @Query() sortType = 1) {

        const goodsList = await this.pinduoduoService.getGoodsList({
            page: page,
            pageSize: pageSize,
            list_id: listID,
            sort_type: sortType
        })

        return { success: true, message: 'OK', data: goodsList };
    }


    @Post('/get_activity_url')
    async get_activity_url(@Query(ALL) query) {

        const urlList = await this.pinduoduoService.getActivityUrl()

        return { success: true, message: 'OK', data: urlList };
    }

}
