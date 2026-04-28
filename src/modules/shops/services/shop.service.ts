import { bodyToShop, responseFromShop } from "../dtos/shop.dto.js";
import { addShop, checkRegionExists, getShop } from "../repositories/shop.repository.js";

export const createShop = async (data: ReturnType<typeof bodyToShop>) => {
  const regionExists = await checkRegionExists(data.region_id);
  if (!regionExists) {
    throw new Error("존재하지 않는 지역입니다.");
  }

  const shopId = await addShop(data);
  const shop = await getShop(shopId);
  return responseFromShop(shop);
};