import { StatusCodes } from "http-status-codes";
import { bodyToReview } from "../dtos/review.dto.js";
import { createReview, getReviews } from "../services/review.service.js";
export const handleCreateReview = async (req, res, next) => {
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
        const data = bodyToReview(req.body, shopId);
        const imageFiles = (req.body.image_urls ?? []).map((url) => ({
            s3_url: url,
            s3_key: url.split("/").pop() ?? url,
        }));
        const review = await createReview(data, imageFiles);
        res.status(StatusCodes.OK).json({ result: review });
    }
    catch (err) {
        next(err);
    }
};
export const handleGetReviews = async (req, res, next) => {
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
        // cursor 타입 안전하게 처리
        const cursor = typeof req.query["cursor"] === "string"
            ? parseInt(req.query["cursor"], 10)
            : 0;
        const result = await getReviews(shopId, cursor);
        res.status(StatusCodes.OK).json({ result });
    }
    catch (err) {
        next(err);
    }
};
//# sourceMappingURL=review.controller.js.map