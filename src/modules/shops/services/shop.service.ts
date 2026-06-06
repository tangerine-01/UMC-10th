import { bodyToShop, responseFromShop } from "../dtos/shop.dto.js";
import { NotFoundError } from "../../../common/errors/error.js";
import {
  addShop,
  checkRegionExists,
  getShop,
} from "../repositories/shop.repository.js";

export const createShop = async (data: ReturnType<typeof bodyToShop>) => {
  // 1. 지역 존재 여부 확인
  const regionExists = await checkRegionExists(data.region_id);
  if (!regionExists) {
    throw new NotFoundError("존재하지 않는 지역입니다.", { regionId: data.region_id });
  }

  // 2. 가게 삽입
  const shopId = await addShop(data);

  // 3. 저장된 가게 반환
  const shop = await getShop(shopId);
  if (!shop) {
    throw new NotFoundError("가게 조회에 실패했습니다.", { shopId });
  }
  return responseFromShop(shop);
};