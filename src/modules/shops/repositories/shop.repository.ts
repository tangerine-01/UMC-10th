import { prisma } from "../../../db.config.js";

export const checkRegionExists = async (regionId: number): Promise<boolean> => {
  const count = await prisma.region.count({ where: { id: BigInt(regionId) } });
  return count > 0;
};

export const addShop = async (data: {
  owner_id: number;
  region_id: number;
  shop_name: string;
  shop_position: string;
  shop_explain: string | null;
  shop_phone: string | null;
}): Promise<number> => {
  try {
    const created = await prisma.shop.create({
      data: {
        ownerId: BigInt(data.owner_id),
        regionId: BigInt(data.region_id),
        shopName: data.shop_name,
        shopPosition: data.shop_position,
        shopExplain: data.shop_explain,
        shopPhone: data.shop_phone,
      },
    });
    return Number(created.id);
  } catch (err) {
    throw new Error(`가게 추가 오류: ${err}`);
  }
};

export const getShop = async (shopId: number): Promise<any | null> => {
  const shop = await prisma.shop.findUnique({
    where: { id: BigInt(shopId) },
    include: { region: true },
  });

  if (!shop) return null;

  return {
    id: Number(shop.id),
    owner_id: Number(shop.ownerId),
    region_id: Number(shop.regionId),
    region_name: shop.region.regionName,
    shop_name: shop.shopName,
    shop_position: shop.shopPosition,
    shop_explain: shop.shopExplain,
    shop_phone: shop.shopPhone,
    status: shop.status,
  };
};