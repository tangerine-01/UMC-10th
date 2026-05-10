import { Body, Controller, Path, Post, Route, Tags } from "tsoa";
import { ApiResponse, success } from "../../../common/responses/response.js";
import { bodyToShop, ShopCreateRequest, ShopResponse } from "../dtos/shop.dto.js";
import { createShop } from "../services/shop.service.js";

@Route("regions")
@Tags("Shops")
export class ShopController extends Controller {
  @Post("{regionId}/shops")
  public async handleCreateShop(
    @Path() regionId: number,
    @Body() body: ShopCreateRequest,
  ): Promise<ApiResponse<ShopResponse>> {
    const data = bodyToShop({ ...body, region_id: regionId });
    const shop = await createShop(data);
    return success(shop);
  }
}