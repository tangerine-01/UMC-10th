export interface ShopCreateRequest {
  owner_id: number;
  region_id: number;
  shop_name: string;
  shop_position: string;
  shop_explain?: string;
  shop_phone?: string;
}

export const bodyToShop = (body: ShopCreateRequest) => {
  return {
    owner_id: body.owner_id,
    region_id: body.region_id,
    shop_name: body.shop_name,
    shop_position: body.shop_position,
    shop_explain: body.shop_explain ?? null,
    shop_phone: body.shop_phone ?? null,
  };
};

export const responseFromShop = (shop: any) => {
  return {
    shop_id: shop.id,
    owner_id: shop.owner_id,
    region_id: shop.region_id,
    region_name: shop.region_name,
    shop_name: shop.shop_name,
    shop_position: shop.shop_position,
    shop_explain: shop.shop_explain,
    shop_phone: shop.shop_phone,
    status: shop.status,
  };
};