import { Body, Controller, Example, Get, Path, Post, Query, Response, Route, Tags } from "tsoa";
import { ApiFailedResponse, ApiResponse, success } from "../../../common/responses/response.js";
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
  /**
   * 가게 리뷰 작성 API
   * @summary 특정 가게에 리뷰를 등록합니다.
   * @param shopId 리뷰를 작성할 가게 ID
   */
  @Post("{shopId}/reviews")
  @Example<ReviewCreateRequest>({
    user_id: 1,
    user_mission_id: 1,
    rating: 4.5,
    body: "맛있었어요!",
    image_urls: ["https://example.com/review1.jpg"],
  })
  @Response<ApiResponse<ReviewCreateResponse>>(200, "리뷰 작성 성공")
  @Response<ApiFailedResponse>(400, "요청 형식 오류·별점 범위 오류·미션 미완료 등 (COMMON400)")
  @Response<ApiFailedResponse>(404, "존재하지 않는 가게 (COMMON404)")
  @Response<ApiFailedResponse>(409, "해당 미션에 대한 리뷰 중복 (COMMON409)")
  @Response<ApiFailedResponse>(500, "서버 오류 (COMMON500)")
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

  /**
   * 가게 리뷰 목록 조회 API
   * @summary 특정 가게의 리뷰 목록을 커서 기반으로 조회합니다.
   * @param shopId 가게 ID
   * @param cursor 페이지네이션 커서 (기본값 0, 이전 응답의 pagination.cursor 사용)
   */
  @Get("{shopId}/reviews")
  @Response<ApiResponse<ReviewsListResponse>>(200, "리뷰 목록 조회 성공")
  @Response<ApiFailedResponse>(400, "요청 형식 오류 (COMMON400)")
  @Response<ApiFailedResponse>(404, "존재하지 않는 가게 (COMMON404)")
  @Response<ApiFailedResponse>(500, "서버 오류 (COMMON500)")
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
  /**
   * 내가 작성한 리뷰 목록 조회 API
   * @summary 특정 유저가 작성한 리뷰 목록을 커서 기반으로 조회합니다.
   * @param userId 유저 ID
   * @param cursor 페이지네이션 커서 (기본값 0)
   */
  @Get("{userId}/reviews")
  @Response<ApiResponse<MyReviewsListResponse>>(200, "내 리뷰 목록 조회 성공")
  @Response<ApiFailedResponse>(400, "요청 형식 오류 (COMMON400)")
  @Response<ApiFailedResponse>(404, "존재하지 않는 유저 (COMMON404)")
  @Response<ApiFailedResponse>(500, "서버 오류 (COMMON500)")
  public async handleGetMyReviews(
    @Path() userId: number,
    @Query() cursor: number = 0,
  ): Promise<ApiResponse<MyReviewsListResponse>> {
    const result = await getMyReviews(userId, cursor);
    return success(result);
  }
}
