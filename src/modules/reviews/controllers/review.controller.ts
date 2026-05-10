import { Body, Controller, Get, Path, Post, Query, Route, Tags } from "tsoa";
import { ApiResponse, success } from "../../../common/responses/response.js";
import {
  bodyToReview,
  MyReviewsListResponse,
  ReviewCreateRequest,
  ReviewCreateResponse,
  ReviewsListResponse,
} from "../dtos/review.dto.js";
import { createReview, getMyReviews, getReviews } from "../services/review.service.js";

@Route("shops")
@Tags("Reviews")
export class ReviewController extends Controller {
  @Post("{shopId}/reviews")
  public async handleCreateReview(
    @Path() shopId: number,
    @Body() body: ReviewCreateRequest,
  ): Promise<ApiResponse<ReviewCreateResponse>> {
    const data = bodyToReview(body, shopId);
    const imageFiles = (body.image_urls ?? []).map((url: string) => ({
      s3_url: url,
      s3_key: url.split("/").pop() ?? url,
    }));
    const review = await createReview(data, imageFiles);
    return success(review);
  }

  @Get("{shopId}/reviews")
  public async handleGetReviews(
    @Path() shopId: number,
    @Query() cursor: number = 0,
  ): Promise<ApiResponse<ReviewsListResponse>> {
    const result = await getReviews(shopId, cursor);
    return success(result);
  }
}

@Route("users")
@Tags("Reviews")
export class UserReviewController extends Controller {
  @Get("{userId}/reviews")
  public async handleGetMyReviews(
    @Path() userId: number,
    @Query() cursor: number = 0,
  ): Promise<ApiResponse<MyReviewsListResponse>> {
    const result = await getMyReviews(userId, cursor);
    return success(result);
  }
}