import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import { bodyToReview, ReviewCreateRequest } from "../dtos/review.dto.js";
import { createReview, getReviews } from "../services/review.service.js";

export const handleCreateReview = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const shopIdParam = req.params["shopId"];
    if (!shopIdParam) {
      res.status(StatusCodes.BAD_REQUEST).json({ error: "가게 ID가 없습니다." });
      return;
    }
    const shopId = parseInt(shopIdParam as string);

    if (isNaN(shopId)) {
      res.status(StatusCodes.BAD_REQUEST).json({ error: "유효하지 않은 가게 ID입니다." });
      return;
    }

    const data = bodyToReview(req.body as ReviewCreateRequest, shopId);

    const imageFiles = (req.body.image_urls ?? []).map((url: string) => ({
      s3_url: url,
      s3_key: url.split("/").pop() ?? url,
    }));

    const review = await createReview(data, imageFiles);
    res.status(StatusCodes.OK).json({ result: review });
  } catch (err) {
    next(err);
  }
};

export const handleGetReviews = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const shopIdParam = req.params["shopId"];
    if (!shopIdParam) {
      res.status(StatusCodes.BAD_REQUEST).json({ error: "가게 ID가 없습니다." });
      return;
    }

    const shopId = parseInt(shopIdParam);
    if (isNaN(shopId)) {
      res.status(StatusCodes.BAD_REQUEST).json({ error: "유효하지 않은 가게 ID입니다." });
      return;
    }

    const cursor = parseInt(req.query["cursor"] as string) || 0;

    const result = await getReviews(shopId, cursor);
    res.status(StatusCodes.OK).json({ result });
  } catch (err) {
    next(err);
  }
};