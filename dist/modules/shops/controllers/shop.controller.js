import { StatusCodes } from "http-status-codes";
import { bodyToShop } from "../dtos/shop.dto.js";
import { createShop } from "../services/shop.service.js";
export const handleCreateShop = async (req, res, next) => {
    try {
        const data = bodyToShop(req.body);
        const shop = await createShop(data);
        res.status(StatusCodes.OK).json({ result: shop });
    }
    catch (err) {
        next(err);
    }
};
//# sourceMappingURL=shop.controller.js.map