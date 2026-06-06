export const bodyToReview = (body, shopId) => {
    return {
        user_id: body.user_id,
        shop_id: shopId,
        user_mission_id: body.user_mission_id,
        rating: body.rating,
        body: body.body,
        image_urls: body.image_urls ?? [],
    };
};
export const responseFromReview = (review, images) => {
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
export const responseFromReviews = (reviews) => {
    const lastReview = reviews[reviews.length - 1];
    return {
        data: reviews.map((r) => ({
            review_id: r.id,
            nickname: r.nickname,
            rating: Number(r.rating),
            body: r.body,
            created_date: r.created_date,
        })),
        pagination: {
            cursor: lastReview ? lastReview.id : null,
        },
    };
};
export const responseFromMyReviews = (reviews) => {
    const lastReview = reviews[reviews.length - 1];
    return {
        data: reviews.map((r) => ({
            review_id: r.id,
            shop_id: r.shop_id,
            shop_name: r.shop_name,
            rating: Number(r.rating),
            body: r.body,
            created_date: r.created_date,
        })),
        pagination: {
            cursor: lastReview ? lastReview.id : null,
        },
    };
};
//# sourceMappingURL=review.dto.js.map