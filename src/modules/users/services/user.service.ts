import bcrypt from "bcrypt";;
import { UserSignUpRequest, UserSignUpResponse } from "../dtos/user.dto.js"; //인터페이스 가져오기
import { addUser, getUser, getUserPreferencesByUserId, setPreference } from "../repositories/user.repository.js";
import { DuplicateUserEmailError } from "../../../common/errors/error.js";

export const userSignUp = async (data: UserSignUpRequest): Promise<UserSignUpResponse> => {
  const birth_data = new Date(data.birth_data);

  // 비밀번호 해싱
  const hashedPassword = await bcrypt.hash(data.password, 10);
  
  const joinUserId = await addUser({
    user_name: data.user_name,
    nickname: data.nickname,
    user_phone: data.user_phone,
    user_gender: data.user_gender,
    birth_data, // 문자열을 Date 객체로 변환해서 넘겨줍니다.
    address: data.address,
    role: data.role,
    point: data.point,
    email: data.email,
    preferences: data.preferences,
    password: hashedPassword,
    // birth_data: new Date(data.birth_data),    // 문자열을 Date 객체로 변환해서 넘겨줍니다. 이렇게 해도 됨.
  });

  if (joinUserId === null) {
    // 기존 원인 메시지는 유지하면서, 실패한 요청 data도 error.data에 포함
    throw new DuplicateUserEmailError("이미 존재하는 이메일입니다.", data);
  }

  for (const preference of data.preferences) {
    await setPreference(joinUserId, preference);
  }

  return {
    userId: joinUserId,
    preferences: (await getUserPreferencesByUserId(joinUserId)).map((obj) => obj.foodCategory.name),
  };
};