import { Provide } from "@midwayjs/decorator";
import { IPinduoduoBaseQuery } from "../interface";



@Provide()
export class PinduoduoService {
    async getGoodsList(query: IPinduoduoBaseQuery) {
        return query
    }
}