import dotenv from "dotenv";
import bcrypt from "bcrypt";
import { Strategy as GoogleStrategy, Profile } from "passport-google-oauth20";
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import jwt from "jsonwebtoken";
import { prisma } from "./db.config.js";

dotenv.config();

export type AuthUserPayload = { id: number; email: string; name: string };

// 1. JWT 토큰 생성 함수 (타입 지정)
export const generateAccessToken = (user: { id: number; email: string }) => {
  return jwt.sign(
    { id: user.id, email: user.email },
    process.env.JWT_SECRET!,
    { expiresIn: "1h" }
  );
};

export const generateRefreshToken = (user: { id: number }) => {
  return jwt.sign(
    { id: user.id },
    process.env.JWT_SECRET!,
    { expiresIn: "14d" }
  );
};

// 2. Google Verify 로직
const googleVerify = async (profile: Profile): Promise<AuthUserPayload> => {
  const email = profile.emails?.[0]?.value;
  if (!email) throw new Error("Google 프로필에 이메일이 없습니다.");

  let user = await prisma.user.findFirst({ where: { email } });

  if (!user) {
    const displayName = profile.displayName ?? email.split("@")[0];
    const placeholderPassword = await bcrypt.hash(crypto.randomUUID(), 10);

    user = await prisma.user.create({
      data: {
        email,
        userName: displayName,
        nickname: displayName,
        userPhone: "01000000000",
        userGender: "여성",
        birthData: new Date("1970-01-01"),
        address: "추후 수정",
        role: "일반_사용자",
        point: 0,
        preferences: [],
        password: placeholderPassword,
      },
    });
  }

  return { id: Number(user.id), email: user.email, name: user.userName };
};

// 3. Google Strategy
const GOOGLE_CALLBACK_PATH = "/oauth2/callback/google";
const APP_BASE_URL = process.env.APP_BASE_URL!;

export const googleStrategy = new GoogleStrategy(
  {
    clientID: process.env.PASSPORT_GOOGLE_CLIENT_ID!,
    clientSecret: process.env.PASSPORT_GOOGLE_CLIENT_SECRET!,
    callbackURL: `${APP_BASE_URL}${GOOGLE_CALLBACK_PATH}`,
    scope: ["email", "profile"],
    proxy: true,
  },
  async (_accessToken, _refreshToken, profile, cb) => {
    try {
      const user = await googleVerify(profile);
      const tokens = {
        accessToken: generateAccessToken(user),
        refreshToken: generateRefreshToken(user),
      };
      return cb(null, tokens);
    } catch (err) {
      return cb(err as Error);
    }
  }
);

export const jwtStrategy = new JwtStrategy(
  {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET!,
  },
  async (payload, done) => {
    try {
      const user = await prisma.user.findFirst({ where: { id: BigInt(payload.id) } });
      if (!user) return done(null, false);
      return done(null, {
        id: Number(user.id),
        email: user.email,
        name: user.userName,
      });
    } catch (err) {
      return done(err, false);
    }
  }
);

declare module "express-serve-static-core" {
  interface Response {
    error(payload: {
      errorCode?: string | null;
      message?: string | null;
      data?: unknown;
    }): this;
    success(data: unknown): this;
  }

  interface Request {
    user?: AuthUserPayload;
  }
}