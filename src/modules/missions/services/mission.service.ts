import {
  bodyToMission,
  bodyToUserMission,
  responseFromMission,
  responseFromInProgressMissions,
  responseFromMissions,
  responseFromUserMission,
} from "../dtos/mission.dto.js";
import {
  addMission,
  addUserMission,
  checkUserExists,
  checkMissionExists,
  checkShopExists,
  checkUserMissionInProgress,
  getMission,
  getInProgressMissionsByUserId,
  getMissionsByShopId,
  getUserMission,
} from "../repositories/mission.repository.js";

// 가게에 미션 추가
export const createMission = async (data: ReturnType<typeof bodyToMission>) => {
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

export const challengeMission = async (data: ReturnType<typeof bodyToUserMission>) => {
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

export const getMissions = async (shopId: number, cursor: number) => {
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

export const getInProgressMissions = async (userId: number, cursor: number) => {
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