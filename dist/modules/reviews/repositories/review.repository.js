import { prisma } from "../../../db.config.js";
export const checkMissionCompleted = async (userId, shopId, userMissionId) => {
    const count = await prisma.userMission.count({
        where: {
            id: BigInt(userMissionId),
            userId: BigInt(userId),
            status: "성공",
            mission: { shopId: BigInt(shopId) },
        },
    });
    return count > 0;
};
export const checkReviewExists = async (userMissionId) => {
    const count = await prisma.review.count({
        where: { userMissionId: BigInt(userMissionId) },
    });
    return count > 0;
};
export const addReview = async (data) => {
    try {
        const created = await prisma.review.create({
            data: {
                userId: BigInt(data.user_id),
                shopId: BigInt(data.shop_id),
                userMissionId: BigInt(data.user_mission_id),
                rating: data.rating,
                body: data.body,
            },
        });
        return Number(created.id);
    }
    catch (err) {
        throw new Error(`리뷰 삽입 오류: ${err}`);
    }
};
export const addReviewImages = async (reviewId, images) => {
    if (images.length === 0)
        return;
    try {
        await prisma.reviewImage.createMany({
            data: images.map((img) => ({
                reviewId: BigInt(reviewId),
                s3Url: img.s3_url,
                s3Key: img.s3_key,
            })),
        });
    }
    catch (err) {
        throw new Error(`이미지 삽입 오류: ${err}`);
    }
};
export const getReview = async (reviewId) => {
    const review = await prisma.review.findUnique({
        where: { id: BigInt(reviewId) },
        include: { user: { select: { nickname: true } } },
    });
    if (!review)
        return null;
    return {
        id: Number(review.id),
        shop_id: Number(review.shopId),
        user_id: Number(review.userId),
        user_mission_id: Number(review.userMissionId),
        rating: review.rating,
        body: review.body,
        created_date: review.createdDate,
        nickname: review.user.nickname,
    };
};
export const getReviewImages = async (reviewId) => {
    const rows = await prisma.reviewImage.findMany({
        where: { reviewId: BigInt(reviewId) },
        orderBy: { id: "asc" },
    });
    return rows.map((img) => ({
        id: Number(img.id),
        review_id: Number(img.reviewId),
        s3_url: img.s3Url,
        s3_key: img.s3Key,
    }));
};
export const checkShopExists = async (shopId) => {
    const count = await prisma.shop.count({ where: { id: BigInt(shopId) } });
    return count > 0;
};
export const getReviewsByShopId = async (shopId, cursor) => {
    const rows = await prisma.review.findMany({
        where: {
            shopId: BigInt(shopId),
            ...(cursor > 0 ? { id: { gt: BigInt(cursor) } } : {}),
        },
        include: { user: { select: { nickname: true } } },
        orderBy: { id: "asc" },
        take: 5,
    });
    return rows.map((r) => ({
        id: Number(r.id),
        rating: r.rating,
        body: r.body,
        created_date: r.createdDate,
        nickname: r.user.nickname,
    }));
};
//# sourceMappingURL=review.repository.js.map