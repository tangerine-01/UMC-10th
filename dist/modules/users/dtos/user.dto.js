// 2. 요청받은 데이터를 우리 시스템에 맞는 데이터로 변환해주는 함수입니다. 
export const bodyToUser = (body) => {
    const birth_data = new Date(body.birth_data); //날짜 변환
    return {
        user_name: body.user_name,
        nickname: body.nickname,
        user_phone: body.user_phone,
        user_gender: body.user_gender, // "여성" | "남성";
        birth_data,
        address: body.address,
        role: body.role, // "일반 사용자" | "가게 운영자";
        point: body.point,
        email: body.email,
        preferences: body.preferences,
        password: body.password,
        // address: body.address || "", //선택 
    };
};
// responseFromUser 만들기
export const responseFromUser = (data) => {
    const preferCategory = data.preferences?.map((p) => p.foodCategory.name);
    return {
        userName: data.user.userName,
        nickname: data.user.nickname,
        userPhone: data.user.userPhone,
        userGender: data.user.userGender,
        birthData: data.user.birthData,
        address: data.user.address,
        role: data.user.role,
        point: data.user.point,
        email: data.user.email,
        preferences: data.user.preferences,
        preferCategory: preferCategory,
    };
};
//# sourceMappingURL=user.dto.js.map