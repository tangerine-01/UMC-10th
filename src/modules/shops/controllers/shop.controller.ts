import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import { bodyToShop, ShopCreateRequest } from "../dtos/shop.dto.js";
import { createShop } from "../services/shop.service.js";

export const handleCreateShop = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = bodyToShop(req.body as ShopCreateRequest);
    const shop = await createShop(data);
    res.status(StatusCodes.OK).json({ result: shop });
  } catch (err) {
    next(err);
  }
};