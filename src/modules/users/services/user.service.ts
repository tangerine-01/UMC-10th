import bcrypt from "bcrypt";
import { UserSignUpRequest, UserSignUpResponse } from "../dtos/user.dto.js"; //인터페이스 가져오기
import { addUser, findFoodCategoriesByIds } from "../repositories/user.repository.js";
import { DuplicateUserEmailError, ValidationError } from "../../../common/errors/error.js";

export const userSignUp = async (data: UserSignUpRequest): Promise<UserSignUpResponse> => {
  const birth_data = new Date(data.birth_data);

  // 선호 카테고리 ID는 FK(userFoodCategory) 또는 JSON 저장 전에 반드시 존재 여부 확인
  const categories = await findFoodCategoriesByIds(data.preferences);
  const foundIds = new Set(categories.map((c) => Number(c.id)));
  const missingIds = data.preferences.filter((id) => !foundIds.has(id));
  if (missingIds.length > 0) {
    throw new ValidationError("존재하지 않는 음식 카테고리 ID가 포함되어 있습니다.", {
      preferences: data.preferences,
      invalidIds: missingIds,
    });
  }

  const idToName = new Map(categories.map((c) => [Number(c.id), c.name]));
  const preferenceNames = data.preferences.map((id) => idToName.get(id)!);

  // 비밀번호 해싱
  const hashedPassword = await bcrypt.hash(data.password, 10);

  const joinUserId = await addUser({
    user_name: data.user_name,
    nickname: data.nickname,
    user_phone: data.user_phone,
    user_gender: data.user_gender,
    birth_data,
    address: data.address,
    role: data.role,
    point: data.point,
    email: data.email,
    preferences: data.preferences,
    password: hashedPassword,
  });

  if (joinUserId === null) {
    throw new DuplicateUserEmailError("이미 존재하는 이메일입니다.", data);
  }

  return {
    userId: joinUserId,
    preferences: preferenceNames,
  };
};