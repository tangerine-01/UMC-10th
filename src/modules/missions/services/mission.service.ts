import {
  bodyToMission,
  bodyToUserMission,
  responseFromMission,
  responseFromUserMission,
} from "../dtos/mission.dto.js";
import {
  addMission,
  addUserMission,
  checkMissionExists,
  checkShopExists,
  checkUserMissionInProgress,
  getMission,
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