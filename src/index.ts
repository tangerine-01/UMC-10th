import dotenv from "dotenv";
import express, { Express, NextFunction, Request, Response } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import { RegisterRoutes } from "./generated/routes.js";
import { AppError } from "./common/errors/app.error.js";

// 1. 환경 변수 설정
dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

app.use((req: Request, res: Response, next: NextFunction) => {
  (res as any).error = function ({ errorCode = null, message = null, data = null }) {
    return this.json({
      resultType: "FAILED",
      error: { errorCode, message, data },
      data: null,
    });
  };
  next();
});

// 2. 미들웨어 설정
app.use(morgan("dev"));               // HTTP 요청 로깅 (morgan)
app.use(cors());                      // cors 방식 허용
app.use(express.static('public'));    // 정적 파일 접근
app.use(express.json());              // request의 본문을 json으로 해석할 수 있도록 함(JSON 형태의 요청 body를 파싱하기 위함)
app.use(express.urlencoded({ extended: false })); // 단순 객체 문자열 형태로 본문 데이터 해석
app.use(cookieParser());              // req.cookies 사용 (cookie-parser)

// Express.js에 생성한 엔드 포인트들을 register
const router = express.Router();
RegisterRoutes(router);
app.use("/api/v1", router);

function isAppError(err: unknown): err is AppError {
  return err instanceof AppError;
}

/** Prisma 등에서 나온 긴 기술 메시지는 클라이언트에 그대로 노출하지 않음 */
function clientSafeErrorPayload(err: unknown): { statusCode: number; errorCode: string; message: string; data: unknown } {
  if (isAppError(err)) {
    return {
      statusCode: err.statusCode || 500,
      errorCode: err.errorCode || "UNKNOWN",
      message: err.message || "오류가 발생했습니다.",
      data: err.data ?? null,
    };
  }

  console.error(err);

  if (err instanceof Error) {
    const m = err.message;
    const isPrismaLike =
      m.includes("Invalid `prisma.") ||
      /foreign key constraint/i.test(m) ||
      /unique constraint/i.test(m);

    if (isPrismaLike) {
      return {
        statusCode: 400,
        errorCode: "COMMON400",
        message: "요청 값이 데이터베이스 조건과 맞지 않습니다. 참조 ID·중복 여부 등을 확인해 주세요.",
        data: null,
      };
    }

    return {
      statusCode: 500,
      errorCode: "COMMON500",
      message: m || "서버 오류가 발생했습니다.",
      data: null,
    };
  }

  return {
    statusCode: 500,
    errorCode: "COMMON500",
    message: "알 수 없는 오류가 발생했습니다.",
    data: null,
  };
}

/**
 * 전역 오류를 처리하기 위한 미들웨어
 */
app.use((err: unknown, req: Request, res: Response, next: NextFunction) => {
  if (res.headersSent) {
    return next(err);
  }

  const payload = clientSafeErrorPayload(err);
  (res.status(payload.statusCode) as any).error({
    errorCode: payload.errorCode,
    message: payload.message,
    data: payload.data,
  });
});

// 4. 서버 시작
app.listen(port, () => {
  console.log(`[server]: Server is running at <http://localhost>:${port}`);
});