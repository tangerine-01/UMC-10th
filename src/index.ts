import dotenv from "dotenv";
import express, { Express, Request, Response, NextFunction } from "express";
import cors from "cors";
import { handleUserSignUp } from "./modules/users/controllers/user.controller.js";
import { handleCreateReview } from "./modules/reviews/controllers/review.controller.js";
import { handleCreateMission, handleChallengeMission } from "./modules/missions/controllers/mission.controller.js";
import { handleCreateShop } from "./modules/shops/controllers/shop.controller.js";

// 1. 환경 변수 설정
dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

// 2. 미들웨어 설정
app.use(cors());            // cors 방식 허용                 
app.use(express.static('public'));    // 정적 파일 접근      
app.use(express.json());              // request의 본문을 json으로 해석할 수 있도록 함(JSON 형태의 요청 body를 파싱하기 위함)     
app.use(express.urlencoded({ extended: false })); // 단순 객체 문자열 형태로 본문 데이터 해석

// 3. 기본 라우트
app.get("/", (req: Request, res: Response) => {
  res.send("Hello World! This is TypeScript Server!");
});

app.post("/users", handleUserSignUp);
app.post("/shops/:shopId/reviews", handleCreateReview);
app.post("/missions/challenge", handleChallengeMission);
app.post("/regions/:regionId/shops", handleCreateShop);
app.post("/shops/:shopId/missions", handleCreateMission);

// 전역 에러 핸들러
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.message);
  res.status(500).json({ isSuccess: false, code: "COMMON000", message: err.message });
});

// 4. 서버 시작
app.listen(port, () => {
  console.log(`[server]: Server is running at <http://localhost>:${port}`);
});