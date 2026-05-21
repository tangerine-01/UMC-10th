import { Body, Controller, Example, Get, Middlewares, Post, Request, Response, Route, Tags } from "tsoa";
import { Request as ExpressRequest, Response as ExpressResponse, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import { UserSignUpRequest, UserSignUpResponse } from "../dtos/user.dto.js";
import { userSignUp } from "../services/user.service.js";
import { authorizeUser } from "../../../common/middlewares/auth.middleware.js";
import { ApiFailedResponse, ApiResponse, success } from "../../../common/responses/response.js";

@Route("users")
@Tags("Users")
export class UserController extends Controller {
  /**
   * 회원가입 API
   * @summary 회원가입을 처리하는 엔드포인트입니다.
   */
  @Post("signup")
  @Example<UserSignUpRequest>({
    email: "user@example.com",
    user_name: "홍길동",
    nickname: "UMC10th",
    user_phone: "01012345678",
    user_gender: "여성",
    birth_data: "2000-01-01",
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
   * 게스트 페이지 (HTML)
   * @summary 로그인 없이 접근 가능한 안내 페이지입니다.
   */
  @Get("guest")
  @Response<string>(200, "HTML 페이지")
  public async handleGuestPage(): Promise<string> {
    return `
      <h1>게스트 페이지</h1>
      <p>이 페이지는 로그인이 필요 없습니다.</p>
      <ul>
        <li><a href="/api/users/mypage">마이페이지 (로그인 필요)</a></li>
      </ul>
    `;
  }

  /**
   * 로그인 안내 페이지 (HTML)
   * @summary 인증 실패 시 리다이렉트되는 페이지입니다.
   */
  @Get("login")
  @Response<string>(200, "HTML 페이지")
  public async handleLoginPage(): Promise<string> {
    return "<h1>로그인 페이지</h1><p>로그인이 필요한 페이지에서 튕겨나오면 여기로 옵니다.</p>";
  }

  /**
   * 마이페이지 (HTML, 로그인 필요)
   * @summary 쿠키 기반 로그인이 필요한 페이지입니다.
   */
  @Get("mypage")
  @Middlewares(authorizeUser())
  @Response<string>(200, "HTML 페이지")
  @Response<ApiFailedResponse>(401, "로그인 필요 (미들웨어)")
  public async handleMypage(@Request() req: ExpressRequest): Promise<string> {
    return `
      <h1>마이페이지</h1>
      <p>환영합니다, ${(req as any).cookies?.username}님!</p>
      <p>이 페이지는 로그인한 사람만 볼 수 있습니다.</p>
    `;
  }

  /**
   * 테스트용 로그인 쿠키 설정 (HTML)
   * @summary 개발·테스트용으로 username 쿠키를 설정합니다.
   */
  @Get("set-login")
  @Response<string>(200, "HTML 안내 문구")
  public async handleSetLogin(@Request() req: ExpressRequest): Promise<string> {
    req.res!.cookie("username", "UMC10th", { maxAge: 3600000 });
    return '로그인 쿠키(username=UMC10th) 생성 완료! <a href="/api/users/mypage">마이페이지로 이동</a>';
  }

  /**
   * 테스트용 로그아웃 (HTML)
   * @summary username 쿠키를 삭제합니다.
   */
  @Get("set-logout")
  @Response<string>(200, "HTML 안내 문구")
  public async handleSetLogout(@Request() req: ExpressRequest): Promise<string> {
    req.res!.clearCookie("username");
    return '로그아웃 완료 (쿠키 삭제). <a href="/api/users/guest">메인으로</a>';
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