import bcrypt from "bcrypt";
import {
  UserSignUpRequest,
  UserSignUpResponse,
  UserUpdateProfileRequest,
  UserUpdateProfileResponse,
} from "../dtos/user.dto.js"; //인터페이스 가져오기
import {
  addUser,
  findFoodCategoriesByIds,
  getUser,
  updateUserById,
} from "../repositories/user.repository.js";
import { DuplicateUserEmailError, NotFoundError, ValidationError } from "../../../common/errors/error.js";

export const userSignUp = async (data: UserSignUpRequest): Promise<UserSignUpResponse> => {
  const birth_data = new Date(data.birth_data);
  if (Number.isNaN(birth_data.getTime())) {
    throw new ValidationError("birth_data는 YYYY-MM-DD 형식의 올바른 날짜여야 합니다.", {
      birth_data: data.birth_data,
    });
  }

  const preferenceNames = await validatePreferences(data.preferences);

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

const validatePreferences = async (preferences: number[]) => {
  const categories = await findFoodCategoriesByIds(preferences);
  const foundIds = new Set(categories.map((c) => Number(c.id)));
  const missingIds = preferences.filter((id) => !foundIds.has(id));
  if (missingIds.length > 0) {
    throw new ValidationError("존재하지 않는 음식 카테고리 ID가 포함되어 있습니다.", {
      preferences,
      invalidIds: missingIds,
    });
  }
  const idToName = new Map(categories.map((c) => [Number(c.id), c.name]));
  return preferences.map((id) => idToName.get(id)!);
};

export const updateMyProfile = async (
  userId: number,
  data: UserUpdateProfileRequest,
): Promise<UserUpdateProfileResponse> => {
  let birth_data: Date | undefined;
  if (data.birth_data !== undefined) {
    birth_data = new Date(data.birth_data);
    if (Number.isNaN(birth_data.getTime())) {
      throw new ValidationError("birth_data는 YYYY-MM-DD 형식의 올바른 날짜여야 합니다.", {
        birth_data: data.birth_data,
      });
    }
  }

  let preferenceNames: string[] | undefined;
  if (data.preferences !== undefined) {
    preferenceNames = await validatePreferences(data.preferences);
  }

  const updatedId = await updateUserById(userId, {
    user_name: data.user_name,
    nickname: data.nickname,
    user_phone: data.user_phone,
    user_gender: data.user_gender,
    birth_data,
    address: data.address,
    preferences: data.preferences,
  });

  if (updatedId === null) {
    throw new NotFoundError("존재하지 않는 유저입니다.", { userId });
  }

  if (preferenceNames === undefined) {
    const user = await getUser(userId);
    const ids = Array.isArray(user.preferences)
      ? (user.preferences as number[])
      : [];
    if (ids.length > 0) {
      const categories = await findFoodCategoriesByIds(ids);
      const idToName = new Map(categories.map((c) => [Number(c.id), c.name]));
      preferenceNames = ids.map((id) => idToName.get(id)!).filter(Boolean);
    } else {
      preferenceNames = [];
    }
  }

  return {
    userId: updatedId,
    preferences: preferenceNames,
  };
};