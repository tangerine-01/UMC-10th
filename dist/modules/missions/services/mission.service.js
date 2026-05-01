import { responseFromMission, responseFromInProgressMissions, responseFromMissions, responseFromUserMission, } from "../dtos/mission.dto.js";
import { addMission, addUserMission, checkUserExists, checkMissionExists, checkShopExists, checkUserMissionInProgress, completeUserMission, getMission, getInProgressMissionsByUserId, getMissionsByShopId, getUserMissionByIdAndUserId, getUserMission, } from "../repositories/mission.repository.js";
// 가게에 미션 추가
export const createMission = async (data) => {
    // 1. 가게 존재 여부 확인
    const shopExists = await checkShopExists(data.shop_id);
    if (!shopExists) {
        throw new Error("존재하지 않는 가게입니다.");
    }
    // 2. 미션 삽입
    const missionId = await addMission(data);
    // 3. 저장된 미션 반환
    const mission = await getMission(missionId);
    return responseFromMission(mission);
};
export const challengeMission = async (data) => {
    // 1. 미션 존재 여부 확인
    const missionExists = await checkMissionExists(data.mission_id);
    if (!missionExists) {
        throw new Error("존재하지 않는 미션입니다.");
    }
    // 2. 이미 도전 중인지 확인
    const isInProgress = await checkUserMissionInProgress(data.user_id, data.mission_id);
    if (isInProgress) {
        throw new Error("이미 도전 중인 미션입니다.");
    }
    // 3. user_mission 삽입
    const userMissionId = await addUserMission(data);
    // 4. 저장된 user_mission 반환
    const userMission = await getUserMission(userMissionId);
    return responseFromUserMission(userMission);
};
export const getMissions = async (shopId, cursor) => {
    // 0. 가게 존재 여부 확인
    const shopExists = await checkShopExists(shopId);
    if (!shopExists) {
        throw new Error("존재하지 않는 가게입니다.");
    }
    // 1. 미션 목록 조회
    const missions = await getMissionsByShopId(shopId, cursor);
    // 2. 응답 반환
    return responseFromMissions(missions);
};
export const getInProgressMissions = async (userId, cursor) => {
    // 0. 유저 존재 여부 확인
    const userExists = await checkUserExists(userId);
    if (!userExists) {
        throw new Error("존재하지 않는 유저입니다.");
    }
    // 1. 진행 중인 미션 목록 조회
    const rows = await getInProgressMissionsByUserId(userId, cursor);
    // 2. 응답 반환
    return responseFromInProgressMissions(rows);
};
export const completeInProgressMission = async (userId, userMissionId) => {
    // 0. 유저 존재 여부 확인
    const userExists = await checkUserExists(userId);
    if (!userExists) {
        throw new Error("존재하지 않는 유저입니다.");
    }
    // 1. 해당 유저의 user_mission인지 확인
    const userMission = await getUserMissionByIdAndUserId(userId, userMissionId);
    if (!userMission) {
        throw new Error("존재하지 않는 유저 미션입니다.");
    }
    // 2. 진행중 상태인지 확인 (이미 성공이면 그대로 반환)
    if (userMission.status === "성공") {
        return responseFromUserMission(userMission);
    }
    if (userMission.status !== "진행중") {
        throw new Error("진행 중인 미션만 완료 처리할 수 있습니다.");
    }
    // 3. 완료 처리(성공)
    const updated = await completeUserMission(userId, userMissionId);
    return responseFromUserMission(updated);
};
//# sourceMappingURL=mission.service.js.map