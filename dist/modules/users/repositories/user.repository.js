import { prisma } from "../../../db.config.js";
export const addUser = async (data) => {
    try {
        // 1. 이미 존재하는 이메일인지 확인
        const existingUser = await prisma.user.findFirst({
            where: { email: data.email },
        });
        if (existingUser) {
            return null;
        }
        // 2. role, gender enum 변환
        const roleMap = {
            "일반 사용자": "일반_사용자",
            "가게 운영자": "가게_운영자",
        };
        const genderMap = {
            "여성": "여성",
            "남성": "남성",
        };
        const role = roleMap[data.role] ?? "일반_사용자";
        const userGender = genderMap[data.user_gender] ?? "여성";
        // 3. 새로운 유저 생성
        // [수정] 컬럼명을 새 DB 구조(user_name, nickname, user_phone 등)에 맞게 변경함
        // [수정] preferences 컬럼 추가함 (JSON 타입으로 저장)
        const result = await prisma.user.create({
            data: {
                userName: data.user_name,
                nickname: data.nickname,
                userPhone: data.user_phone,
                userGender: userGender,
                birthData: data.birth_data,
                address: data.address,
                role: role,
                point: data.point,
                email: data.email,
                preferences: data.preferences,
                password: data.password,
            },
        });
        return Number(result.id);
    }
    catch (err) {
        throw new Error(`오류가 발생했어요: ${err}`);
    }
};
// 2. 사용자 정보 얻기
export const getUser = async (userId) => {
    return await prisma.user.findFirstOrThrow({ where: { id: BigInt(userId) } });
};
// 3. 음식 선호 카테고리 매핑
// [수정] preferences를 user 테이블에 JSON으로 저장하는 구조로 변경했으므로 현재는 미사용 함수임
export const setPreference = async (userId, foodCategoryId) => {
    await prisma.userFoodCategory.create({
        data: {
            userId: BigInt(userId),
            foodCategoryId: BigInt(foodCategoryId),
        },
    });
};
// 4. 사용자 선호 카테고리 반환
// [수정] preferences를 user 테이블에 JSON으로 저장하는 구조로 변경했으므로 현재는 미사용 함수임
export const getUserPreferencesByUserId = async (userId) => {
    return await prisma.userFoodCategory.findMany({
        where: { userId: BigInt(userId) },
        include: {
            foodCategory: true, // 핵심: JOIN 대신 include를 써서 연관 데이터를 가져옵니다!
        },
        orderBy: { foodCategoryId: "asc" },
    });
};
//# sourceMappingURL=user.repository.js.map