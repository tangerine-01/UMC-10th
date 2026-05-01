import { bodyToReview, responseFromReview } from "../dtos/review.dto.js";
import {
  addReview,
  addReviewImages,
  checkMissionCompleted,
  checkReviewExists,
  checkShopExists,
  getReview,
  getReviewImages,
  getReviewsByShopId,
} from "../repositories/review.repository.js";

export const createReview = async (
  data: ReturnType<typeof bodyToReview>,
  imageFiles: { s3_url: string; s3_key: string }[]
) => {
  // 0. 가게 존재 여부 확인 ← 추가
  const shopExists = await checkShopExists(data.shop_id);
  if (!shopExists) {
    throw new Error("존재하지 않는 가게입니다.");
  }

  // 1. 별점 유효성 검사
  if (
    data.rating < 1.0 ||
    data.rating > 5.0 ||
    Math.round(data.rating * 2) !== data.rating * 2
  ) {
    throw new Error("별점은 1.0~5.0 사이의 0.5 단위 숫자여야 합니다.");
  }

  // 2. 미션 성공 여부 확인
  const isValid = await checkMissionCompleted(
    data.user_id,
    data.shop_id,
    data.user_mission_id
  );
  if (!isValid) {
    throw new Error("미션을 성공한 유저만 리뷰를 작성할 수 있습니다.");
  }

  // 3. 중복 리뷰 확인
  const alreadyExists = await checkReviewExists(data.user_mission_id);
  if (alreadyExists) {
    throw new Error("이미 해당 미션에 대한 리뷰가 존재합니다.");
  }

  // 4. 리뷰 삽입
  const reviewId = await addReview(data);

  // 5. 이미지 삽입
  await addReviewImages(reviewId, imageFiles);

  // 6. 저장된 리뷰 반환
  const review = await getReview(reviewId);
  const images = await getReviewImages(reviewId);

  return responseFromReview(review, images);
};

export const getReviews = async (shopId: number, cursor: number) => {
  // 0. 가게 존재 여부 확인
  const shopExists = await checkShopExists(shopId);
  if (!shopExists) {
    throw new Error("존재하지 않는 가게입니다.");
  }

  // 1. 리뷰 목록 조회
  const reviews = await getReviewsByShopId(shopId, cursor);

  // 2. 응답 반환
  return responseFromReviews(reviews);
};