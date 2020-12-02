import { Controller, Inject, Post, Provide, Query } from "@midwayjs/decorator";
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
    async get_goods_list(@Query() pageNum: number, pageSize: number) {



        const goodsList = await this.pinduoduoService.getGoodsList()
        return { success: true, message: 'OK', data: goodsList };
    }

}
