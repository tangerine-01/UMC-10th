export interface MissionCreateRequest {
  shop_id: number;
  title: string;
  body: string;
  point: number;
}

export const bodyToMission = (body: MissionCreateRequest, shopId: number) => {
  return {
    shop_id: shopId,
    title: body.title,
    body: body.body,
    point: body.point,
  };
};

export const responseFromMission = (mission: any) => {
  return {
    mission_id: mission.id,
    shop_id: mission.shop_id,
    title: mission.title,
    body: mission.body,
    point: mission.point,
    status: mission.status,
    created_date: mission.created_date,
  };
};

export interface UserMissionCreateRequest {
  user_id: number;
  mission_id: number;
}

export const bodyToUserMission = (body: UserMissionCreateRequest) => {
  return {
    user_id: body.user_id,
    mission_id: body.mission_id,
  };
};

export const responseFromUserMission = (userMission: any) => {
  return {
    user_mission_id: userMission.id,
    user_id: userMission.user_id,
    mission_id: userMission.mission_id,
    status: userMission.status,
    created_date: userMission.created_date,
  };
};