import { prisma } from "../../../db.config.js";

// 가게 존재 여부 확인
export const checkShopExists = async (shopId: number): Promise<boolean> => {
  const count = await prisma.shop.count({ where: { id: BigInt(shopId) } });
  return count > 0;
};

// 미션 삽입
export const addMission = async (data: {
  shop_id: number;
  title: string;
  body: string;
  point: number;
}): Promise<number> => {
  try {
    const created = await prisma.mission.create({
      data: {
        shopId: BigInt(data.shop_id),
        title: data.title,
        body: data.body,
        point: data.point,
      },
    });
    return Number(created.id);
  } catch (err) {
    throw new Error(`미션 추가 오류: ${err}`);
  }
};

// 미션 조회
export const getMission = async (missionId: number): Promise<any | null> => {
  const mission = await prisma.mission.findUnique({
    where: { id: BigInt(missionId) },
  });

  if (!mission) return null;

  return {
    id: Number(mission.id),
    shop_id: Number(mission.shopId),
    title: mission.title,
    body: mission.body,
    point: mission.point,
    status: mission.status,
    created_date: mission.createdDate,
  };
};

// 미션 존재 여부 확인
export const checkMissionExists = async (missionId: number): Promise<boolean> => {
  const count = await prisma.mission.count({ where: { id: BigInt(missionId) } });
  return count > 0;
};

// 이미 도전 중인 미션인지 확인
export const checkUserMissionInProgress = async (
  userId: number,
  missionId: number
): Promise<boolean> => {
  const count = await prisma.userMission.count({
    where: {
      userId: BigInt(userId),
      missionId: BigInt(missionId),
      status: "진행중",
    },
  });
  return count > 0;
};

// user_mission 삽입
export const addUserMission = async (data: {
  user_id: number;
  mission_id: number;
}): Promise<number> => {
  try {
    const created = await prisma.userMission.create({
      data: {
        userId: BigInt(data.user_id),
        missionId: BigInt(data.mission_id),
        status: "진행중",
      },
    });
    return Number(created.id);
  } catch (err) {
    throw new Error(`미션 도전 오류: ${err}`);
  }
};

// user_mission 조회
export const getUserMission = async (userMissionId: number): Promise<any | null> => {
  const userMission = await prisma.userMission.findUnique({
    where: { id: BigInt(userMissionId) },
  });

  if (!userMission) return null;

  return {
    id: Number(userMission.id),
    user_id: Number(userMission.userId),
    mission_id: Number(userMission.missionId),
    status: userMission.status,
    created_date: userMission.createdDate,
  };
};