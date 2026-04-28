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
  point: bigint;
  email: string;
  preferences: number[];
  password: string;
  // address?: string;  ?가 붙으면 '없을 수도 있음(선택)'이라는 뜻이에요!
}

// 2. 요청받은 데이터를 우리 시스템에 맞는 데이터로 변환해주는 함수입니다. 
export const bodyToUser = (body: UserSignUpRequest) => {
  const birth_data = new Date(body.birth_data); //날짜 변환

  return {
    user_name: body.user_name,
    nickname: body.nickname,
    user_phone: body.user_phone,
    user_gender: body.user_gender,    // "여성" | "남성";
    birth_data,
    address: body.address,
    role: body.role,        // "일반 사용자" | "가게 운영자";
    point: body.point,
    email: body.email,
    preferences: body.preferences,
    password: body.password,
    // address: body.address || "", //선택 
  };
};

// responseFromUser 만들기
export const responseFromUser = ({ user }: { user: any }) => {
  return {
    user_name: user.user_name,
    nickname: user.nickname,
    user_phone: user.user_phone,
    user_gender: user.user_gender,
    birth_data: user.birth_data,
    address: user.address,
    role: user.role,
    point: user.point,
    email: user.email,
    preferences: user.preferences,
  };
};