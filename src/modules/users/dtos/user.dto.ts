// 1. 회원가입 요청 데이터의 설계도를 만듭니다.
export interface UserSignUpRequest {
  // id 제거 (AUTO_INCREMENT로 DB가 자동 생성해줌)
  user_name: string;
  nickname: string;
  user_phone: string;
  user_gender: "여성" | "남성";
  birth_data: string;
  address: string;
  role: "일반 사용자" | "가게 운영자";
  point: number;
  email: string;
  preferences: number[];
  password: string;
  // address?: string;  ?가 붙으면 '없을 수도 있음(선택)'이라는 뜻이에요!
}

export interface UserSignUpResponse {
  userId: number;
  preferences: string[];
}