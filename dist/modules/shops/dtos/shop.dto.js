export const bodyToShop = (body) => {
    return {
        owner_id: body.owner_id,
        region_id: body.region_id,
        shop_name: body.shop_name,
        shop_position: body.shop_position,
        shop_explain: body.shop_explain ?? null,
        shop_phone: body.shop_phone ?? null,
    };
};
export const responseFromShop = (shop) => {
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
//# sourceMappingURL=shop.dto.js.map