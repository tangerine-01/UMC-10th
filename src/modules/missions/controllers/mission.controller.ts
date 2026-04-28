import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import {
  bodyToMission,
  bodyToUserMission,
  MissionCreateRequest,
  UserMissionCreateRequest,
} from "../dtos/mission.dto.js";
import { challengeMission, createMission } from "../services/mission.service.js";

// 가게에 미션 추가
export const handleCreateMission = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const shopId = parseInt(req.params["shopId"] as string);
    if (isNaN(shopId)) {
      res.status(StatusCodes.BAD_REQUEST).json({ error: "유효하지 않은 가게 ID입니다." });
      return;
    }
    const data = bodyToMission(req.body as MissionCreateRequest, shopId);
    const mission = await createMission(data);
    res.status(StatusCodes.OK).json({ result: mission });
  } catch (err) {
    next(err);
  }
};

// 미션 도전하기ㅣㅣ
export const handleChallengeMission = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = bodyToUserMission(req.body as UserMissionCreateRequest);
    const userMission = await challengeMission(data);
    res.status(StatusCodes.OK).json({ result: userMission });
  } catch (err) {
    next(err);
  }
};