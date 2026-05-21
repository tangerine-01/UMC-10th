import { Body, Controller, Example, Path, Post, Response, Route, Tags } from "tsoa";
import { ApiFailedResponse, ApiResponse, success } from "../../../common/responses/response.js";
import { bodyToShop, ShopCreateRequest, ShopResponse } from "../dtos/shop.dto.js";
import { createShop } from "../services/shop.service.js";

@Route("regions")
@Tags("Shops")
export class ShopController extends Controller {
  /**
   * 지역 내 가게 등록 API
   * @summary 특정 지역에 새 가게를 등록합니다.
   * @param regionId 가게를 등록할 지역 ID
   */
  @Post("{regionId}/shops")
  @Example<ShopCreateRequest>({
    owner_id: 1,
    shop_name: "UMC 맛집",
    shop_position: "서울시 강남구",
    shop_explain: "UMC 10기 단골 가게",
    shop_phone: "0212345678",
  })
  @Response<ApiResponse<ShopResponse>>(200, "가게 등록 성공")
  @Response<ApiFailedResponse>(400, "요청 형식 오류 (COMMON400)")
  @Response<ApiFailedResponse>(404, "존재하지 않는 지역 (COMMON404)")
  @Response<ApiFailedResponse>(500, "서버 오류 (COMMON500)")
  public async handleCreateShop(
    @Path() regionId: number,
    @Body() body: ShopCreateRequest,
  ): Promise<ApiResponse<ShopResponse>> {
    const data = bodyToShop(body, regionId);
    const shop = await createShop(data);
    return success(shop);
  }
}
