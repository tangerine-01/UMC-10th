import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import {
  bodyToMission,
  bodyToUserMission,
  MissionCreateRequest,
  UserMissionCreateRequest,
} from "../dtos/mission.dto.js";
import {
  challengeMission,
  completeInProgressMission,
  createMission,
  getInProgressMissions,
  getMissions,
} from "../services/mission.service.js";

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

export const handleGetMissions = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const shopIdParam = req.params["shopId"];
    if (!shopIdParam) {
      res.status(StatusCodes.BAD_REQUEST).json({ error: "가게 ID가 없습니다." });
      return;
    }

    const shopId = parseInt(shopIdParam as string);
    if (isNaN(shopId)) {
      res.status(StatusCodes.BAD_REQUEST).json({ error: "유효하지 않은 가게 ID입니다." });
      return;
    }

    const cursor =
      typeof req.query["cursor"] === "string"
        ? parseInt(req.query["cursor"], 10)
        : 0;

    const result = await getMissions(shopId, cursor);
    res.status(StatusCodes.OK).json({ result });
  } catch (err) {
    next(err);
  }
};

export const handleGetInProgressMissions = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userIdParam = req.params["userId"];
    if (!userIdParam) {
      res.status(StatusCodes.BAD_REQUEST).json({ error: "유저 ID가 없습니다." });
      return;
    }

    const userId = parseInt(userIdParam as string);
    if (isNaN(userId)) {
      res.status(StatusCodes.BAD_REQUEST).json({ error: "유효하지 않은 유저 ID입니다." });
      return;
    }

    const cursor =
      typeof req.query["cursor"] === "string"
        ? parseInt(req.query["cursor"], 10)
        : 0;

    const result = await getInProgressMissions(userId, cursor);
    res.status(StatusCodes.OK).json({ result });
  } catch (err) {
    next(err);
  }
};

export const handleCompleteInProgressMission = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userIdParam = req.params["userId"];
    const userMissionIdParam = req.params["userMissionId"];

    if (!userIdParam || !userMissionIdParam) {
      res.status(StatusCodes.BAD_REQUEST).json({ error: "유저 ID 또는 유저 미션 ID가 없습니다." });
      return;
    }

    const userId = parseInt(userIdParam as string);
    const userMissionId = parseInt(userMissionIdParam as string);

    if (isNaN(userId) || isNaN(userMissionId)) {
      res.status(StatusCodes.BAD_REQUEST).json({ error: "유효하지 않은 ID입니다." });
      return;
    }

    const result = await completeInProgressMission(userId, userMissionId);
    res.status(StatusCodes.OK).json({ result });
  } catch (err) {
    next(err);
  }
};