import { Request, Response, NextFunction } from "express";
import passport from "passport";
import type { AuthUserPayload } from "../../auth.config.js";

export function expressAuthentication(
  request: Request,
  securityName: string,
): Promise<AuthUserPayload> {
  if (securityName !== "jwt") {
    return Promise.reject(Object.assign(new Error("Unknown security scheme"), { status: 401 }));
  }

  return new Promise((resolve, reject) => {
    passport.authenticate("jwt", { session: false }, (err: unknown, user: AuthUserPayload | false) => {
      if (err || !user) {
        reject(Object.assign(new Error("로그인이 필요합니다."), { status: 401 }));
        return;
      }
      resolve(user);
    })(request, {} as Response, (() => {}) as NextFunction);
  });
}

export function requireJwtAuth() {
  return (req: Request, res: Response, next: NextFunction) => {
    passport.authenticate("jwt", { session: false }, (err: unknown, user: AuthUserPayload | false) => {
      if (err || !user) {
        return res.status(401).error({
          errorCode: "U002",
          message: "로그인이 필요합니다.",
          data: null,
        });
      }
      req.user = user;
      next();
    })(req, res, next);
  };
}
