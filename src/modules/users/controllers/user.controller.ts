import { Body, Controller, Get, Middlewares, Post, Request, Route, Tags } from "tsoa";
import { Request as ExpressRequest, Response as ExpressResponse, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import { UserSignUpRequest, UserSignUpResponse } from "../dtos/user.dto.js";
import { userSignUp } from "../services/user.service.js";
import { authorizeUser } from "../../../common/middlewares/auth.middleware.js";
import { ApiResponse, success } from "../../../common/responses/response.js";

@Route("users")
@Tags("Users")
export class UserController extends Controller {
  @Post("signup")
  public async handleUserSignUp(@Body() body: UserSignUpRequest): Promise<ApiResponse<UserSignUpResponse>> {
    console.log("회원가입을 요청했습니다!");
    console.log("body:", body);

    const user = await userSignUp(body);
    return success(user);
  }

  @Get("guest")
  public async handleGuestPage(): Promise<string> {
    return `
      <h1>게스트 페이지</h1>
      <p>이 페이지는 로그인이 필요 없습니다.</p>
      <ul>
        <li><a href="/api/users/mypage">마이페이지 (로그인 필요)</a></li>
      </ul>
    `;
  }

  @Get("login")
  public async handleLoginPage(): Promise<string> {
    return "<h1>로그인 페이지</h1><p>로그인이 필요한 페이지에서 튕겨나오면 여기로 옵니다.</p>";
  }

  @Get("mypage")
  @Middlewares(authorizeUser())
  public async handleMypage(@Request() req: ExpressRequest): Promise<string> {
    return `
      <h1>마이페이지</h1>
      <p>환영합니다, ${(req as any).cookies?.username}님!</p>
      <p>이 페이지는 로그인한 사람만 볼 수 있습니다.</p>
    `;
  }

  @Get("set-login")
  public async handleSetLogin(@Request() req: ExpressRequest): Promise<string> {
    req.res!.cookie("username", "UMC10th", { maxAge: 3600000 });
    return '로그인 쿠키(username=UMC10th) 생성 완료! <a href="/api/users/mypage">마이페이지로 이동</a>';
  }

  @Get("set-logout")
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