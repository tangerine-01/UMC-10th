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
export const responseFromMissions = (missions) => {
    const lastMission = missions[missions.length - 1];
    return {
        data: missions.map((m) => ({
            mission_id: m.id,
            shop_id: m.shop_id,
            title: m.title,
            body: m.body,
            point: m.point,
            status: m.status,
            created_date: m.created_date,
        })),
        pagination: {
            cursor: lastMission ? lastMission.id : null,
        },
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
export const responseFromInProgressMissions = (rows) => {
    const lastRow = rows[rows.length - 1];
    return {
        data: rows.map((r) => ({
            user_mission_id: r.user_mission_id,
            mission_id: r.mission_id,
            shop_id: r.shop_id,
            title: r.title,
            body: r.body,
            point: r.point,
            status: r.status,
            created_date: r.created_date,
        })),
        pagination: {
            cursor: lastRow ? lastRow.user_mission_id : null,
        },
    };
};
//# sourceMappingURL=mission.dto.js.map