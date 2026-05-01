export interface ReviewCreateRequest {
  user_id: number;
  user_mission_id: number;
  rating: number;
  body: string;
  image_urls?: string[];
}

export const bodyToReview = (body: ReviewCreateRequest, shopId: number) => {
  return {
    user_id: body.user_id,
    shop_id: shopId,
    user_mission_id: body.user_mission_id,
    rating: body.rating,
    body: body.body,
    image_urls: body.image_urls ?? [],
  };
};

export const responseFromReview = (review: any, images: any[]) => {
  return {
    review_id: review.id,
    shop_id: review.shop_id,
    user_id: review.user_id,
    nickname: review.nickname,
    rating: Number(review.rating),
    body: review.body,
    image_urls: images.map((img) => img.s3_url),
    created_date: review.created_date,
  };
};

export const responseFromReviews = (reviews: any[]) => {
  return {
    reviewData: reviews.map((r) => ({
      review_id: r.id,
      nickname: r.nickname,
      rating: Number(r.rating),
      body: r.body,
      created_date: r.created_date,
    })),
    cursorId: reviews.length > 0 ? reviews[reviews.length - 1].id : null,
  };
};