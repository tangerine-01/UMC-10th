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

export const getUserMissionByIdAndUserId = async (
  userId: number,
  userMissionId: number
): Promise<any | null> => {
  const row = await prisma.userMission.findFirst({
    where: {
      id: BigInt(userMissionId),
      userId: BigInt(userId),
    },
  });

  if (!row) return null;

  return {
    id: Number(row.id),
    user_id: Number(row.userId),
    mission_id: Number(row.missionId),
    status: row.status,
    created_date: row.createdDate,
  };
};

export const completeUserMission = async (
  userId: number,
  userMissionId: number
): Promise<any> => {
  const updated = await prisma.userMission.update({
    where: { id: BigInt(userMissionId) },
    data: { status: "성공" },
  });

  return {
    id: Number(updated.id),
    user_id: Number(updated.userId),
    mission_id: Number(updated.missionId),
    status: updated.status,
    created_date: updated.createdDate,
  };
};

export const getMissionsByShopId = async (
  shopId: number,
  cursor: number
): Promise<any[]> => {
  const rows = await prisma.mission.findMany({
    where: {
      shopId: BigInt(shopId),
      ...(cursor > 0 ? { id: { gt: BigInt(cursor) } } : {}),
    },
    orderBy: { id: "asc" },
    take: 5,
  });

  return rows.map((m) => ({
    id: Number(m.id),
    shop_id: Number(m.shopId),
    title: m.title,
    body: m.body,
    point: m.point,
    status: m.status,
    created_date: m.createdDate,
  }));
};

export const checkUserExists = async (userId: number): Promise<boolean> => {
  const count = await prisma.user.count({ where: { id: BigInt(userId) } });
  return count > 0;
};

export const getInProgressMissionsByUserId = async (
  userId: number,
  cursor: number
): Promise<any[]> => {
  const rows = await prisma.userMission.findMany({
    where: {
      userId: BigInt(userId),
      status: "진행중",
      ...(cursor > 0 ? { id: { gt: BigInt(cursor) } } : {}),
    },
    include: {
      mission: true,
    },
    orderBy: { id: "asc" },
    take: 5,
  });

  return rows.map((um) => ({
    user_mission_id: Number(um.id),
    mission_id: Number(um.missionId),
    shop_id: Number(um.mission.shopId),
    title: um.mission.title,
    body: um.mission.body,
    point: um.mission.point,
    status: um.status,
    created_date: um.createdDate,
  }));
};