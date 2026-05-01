export const bodyToMission = (body, shopId) => {
    return {
        shop_id: shopId,
        title: body.title,
        body: body.body,
        point: body.point,
    };
};
export const responseFromMission = (mission) => {
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
export const bodyToUserMission = (body) => {
    return {
        user_id: body.user_id,
        mission_id: body.mission_id,
    };
};
export const responseFromUserMission = (userMission) => {
    return {
        user_mission_id: userMission.id,
        user_id: userMission.user_id,
        mission_id: userMission.mission_id,
        status: userMission.status,
        created_date: userMission.created_date,
    };
};
//# sourceMappingURL=mission.dto.js.map