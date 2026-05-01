import { StatusCodes } from "http-status-codes";
import { bodyToMission, bodyToUserMission, } from "../dtos/mission.dto.js";
import { challengeMission, createMission, getInProgressMissions, getMissions, } from "../services/mission.service.js";
// 가게에 미션 추가
export const handleCreateMission = async (req, res, next) => {
    try {
        const shopId = parseInt(req.params["shopId"]);
        if (isNaN(shopId)) {
            res.status(StatusCodes.BAD_REQUEST).json({ error: "유효하지 않은 가게 ID입니다." });
            return;
        }
        const data = bodyToMission(req.body, shopId);
        const mission = await createMission(data);
        res.status(StatusCodes.OK).json({ result: mission });
    }
    catch (err) {
        next(err);
    }
};
// 미션 도전하기ㅣㅣ
export const handleChallengeMission = async (req, res, next) => {
    try {
        const data = bodyToUserMission(req.body);
        const userMission = await challengeMission(data);
        res.status(StatusCodes.OK).json({ result: userMission });
    }
    catch (err) {
        next(err);
    }
};
export const handleGetMissions = async (req, res, next) => {
    try {
        const shopIdParam = req.params["shopId"];
        if (!shopIdParam) {
            res.status(StatusCodes.BAD_REQUEST).json({ error: "가게 ID가 없습니다." });
            return;
        }
        const shopId = parseInt(shopIdParam);
        if (isNaN(shopId)) {
            res.status(StatusCodes.BAD_REQUEST).json({ error: "유효하지 않은 가게 ID입니다." });
            return;
        }
        const cursor = typeof req.query["cursor"] === "string"
            ? parseInt(req.query["cursor"], 10)
            : 0;
        const result = await getMissions(shopId, cursor);
        res.status(StatusCodes.OK).json({ result });
    }
    catch (err) {
        next(err);
    }
};
export const handleGetInProgressMissions = async (req, res, next) => {
    try {
        const userIdParam = req.params["userId"];
        if (!userIdParam) {
            res.status(StatusCodes.BAD_REQUEST).json({ error: "유저 ID가 없습니다." });
            return;
        }
        const userId = parseInt(userIdParam);
        if (isNaN(userId)) {
            res.status(StatusCodes.BAD_REQUEST).json({ error: "유효하지 않은 유저 ID입니다." });
            return;
        }
        const cursor = typeof req.query["cursor"] === "string"
            ? parseInt(req.query["cursor"], 10)
            : 0;
        const result = await getInProgressMissions(userId, cursor);
        res.status(StatusCodes.OK).json({ result });
    }
    catch (err) {
        next(err);
    }
};
//# sourceMappingURL=mission.controller.js.map