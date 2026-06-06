import { Body, Controller, Example, Get, Patch, Post, Request, Response, Route, Security, Tags } from "tsoa";
import { Request as ExpressRequest, Response as ExpressResponse, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import {
  UserSignUpRequest,
  UserSignUpResponse,
  UserUpdateProfileRequest,
  UserUpdateProfileResponse,
} from "../dtos/user.dto.js";
import { updateMyProfile, userSignUp } from "../services/user.service.js";
import { ApiFailedResponse, ApiResponse, success } from "../../../common/responses/response.js";

@Route("users")
@Tags("Users")
export class UserController extends Controller {
  /**
   * 회원가입 API
   * @summary 회원가입을 처리합니다. (인증 불필요)
   */
  @Post("signup")
  @Example<UserSignUpRequest>({
    email: "user@example.com",
    user_name: "홍길동",
    nickname: "UMC10th",
    user_phone: "01012345678",
    user_gender: "여성",
    birth_data: "2005-09-15",
    address: "서울시",
    role: "일반 사용자",
    point: 0,
    password: "password123",
    preferences: [1],
  })
  @Response<ApiResponse<UserSignUpResponse>>(200, "회원가입 성공")
  @Response<ApiFailedResponse>(400, "요청 형식 오류 (필수 필드 누락·잘못된 필드명·존재하지 않는 선호 카테고리 ID 등)")
  @Response<ApiFailedResponse>(409, "중복된 이메일 (U001)")
  @Response<ApiFailedResponse>(500, "서버 오류 (COMMON500)")
  public async handleUserSignUp(@Body() body: UserSignUpRequest): Promise<ApiResponse<UserSignUpResponse>> {
    const user = await userSignUp(body);
    return success(user);
  }

  /**
   * 내 프로필 수정 API
   * @summary 프로필 정보를 수정합니다 (전화번호·생일·주소·선호 카테고리 등). JWT Bearer 토큰 필요 (Authorize → accessToken)
   */
  @Patch("me")
  @Security("jwt")
  @Example<UserUpdateProfileRequest>({
    user_phone: "01012345678",
    birth_data: "2005-09-15",
    address: "서울시 강남구",
    nickname: "UMC10th",
    user_gender: "여성",
    preferences: [1, 2],
  })
  @Response<ApiResponse<UserUpdateProfileResponse>>(200, "프로필 수정 성공")
  @Response<ApiFailedResponse>(400, "요청 형식 오류·잘못된 birth_data·존재하지 않는 선호 카테고리 ID 등")
  @Response<ApiFailedResponse>(401, "로그인 필요 (U002)")
  @Response<ApiFailedResponse>(404, "존재하지 않는 유저 (COMMON404)")
  @Response<ApiFailedResponse>(500, "서버 오류 (COMMON500)")
  public async handleUpdateMyProfile(
    @Body() body: UserUpdateProfileRequest,
    @Request() req: ExpressRequest,
  ): Promise<ApiResponse<UserUpdateProfileResponse>> {
    const result = await updateMyProfile(req.user!.id, body);
    return success(result);
  }

  /**
   * 마이페이지 조회 API
   * @summary 로그인한 사용자 정보를 조회합니다. JWT Bearer 토큰 필요 (Authorize → accessToken)
   */
  @Get("mypage")
  @Security("jwt")
  @Response<ApiResponse<{ message: string; user: { id: number; email: string; name: string } }>>(200, "마이페이지 조회 성공")
  @Response<ApiFailedResponse>(401, "로그인 필요 (U002)")
  public async handleMypage(@Request() req: ExpressRequest) {
    const user = req.user!;
    return success({
      message: `인증 성공! ${user.name}님의 마이페이지입니다.`,
      user,
    });
  }

  /**
   * 게스트 페이지 (HTML)
   * @summary 로그인 없이 접근 가능한 안내 페이지입니다. (인증 불필요)
   */
  @Get("guest")
  @Response<string>(200, "HTML 페이지")
  public async handleGuestPage(): Promise<string> {
    return `
      <h1>게스트 페이지</h1>
      <p>이 페이지는 로그인이 필요 없습니다.</p>
      <ul>
        <li><a href="/oauth2/login/google">Google JWT 로그인</a></li>
        <li><a href="/docs">Swagger API 문서</a></li>
      </ul>
    `;
  }

  /**
   * 로그인 페이지 (HTML)
   * @summary Google OAuth JWT 로그인 페이지로 이동합니다. (인증 불필요)
   */
  @Get("login")
  @Response<string>(200, "HTML 안내")
  public async handleLoginPage(): Promise<string> {
    return `
      <h1>로그인 페이지</h1>
      <p>Google OAuth로 JWT accessToken을 발급받으세요.</p>
      <p><a href="/oauth2/login/google">Google 로그인</a></p>
    `;
  }
}

// 기존 Express 라우팅과의 호환을 위해 유지합니다.
export const handleUserSignUp = async (req: ExpressRequest, res: ExpressResponse, next: NextFunction) => {
  try {
    const controller = new UserController();
    const result = await controller.handleUserSignUp(req.body as UserSignUpRequest);
    res.status(StatusCodes.OK).json(result);
  } catch (err) {
    next(err);
  }
};
