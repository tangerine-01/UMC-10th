import { Body, Controller, Get, Patch, Path, Post, Query, Route, Tags } from "tsoa";
import { ApiResponse, success } from "../../../common/responses/response.js";
import {
  bodyToMission,
  bodyToUserMission,
  InProgressMissionsListResponse,
  MissionCreateRequest,
  MissionResponse,
  MissionsListResponse,
  UserMissionCreateRequest,
  UserMissionResponse,
} from "../dtos/mission.dto.js";
import {
  challengeMission,
  completeInProgressMission,
  createMission,
  getInProgressMissions,
  getMissions,
} from "../services/mission.service.js";

@Route("shops")
@Tags("Missions")
export class ShopMissionController extends Controller {
  @Post("{shopId}/missions")
  public async handleCreateMission(
    @Path() shopId: number,
    @Body() body: MissionCreateRequest,
  ): Promise<ApiResponse<MissionResponse>> {
    const data = bodyToMission(body, shopId);
    const mission = await createMission(data);
    return success(mission);
  }

  @Get("{shopId}/missions")
  public async handleGetMissions(
    @Path() shopId: number,
    @Query() cursor: number = 0,
  ): Promise<ApiResponse<MissionsListResponse>> {
    const result = await getMissions(shopId, cursor);
    return success(result);
  }
}

@Route("missions")
@Tags("Missions")
export class MissionController extends Controller {
  @Post("challenge")
  public async handleChallengeMission(
    @Body() body: UserMissionCreateRequest,
  ): Promise<ApiResponse<UserMissionResponse>> {
    const data = bodyToUserMission(body);
    const userMission = await challengeMission(data);
    return success(userMission);
  }
}

@Route("users")
@Tags("Missions")
export class UserMissionController extends Controller {
  @Get("{userId}/missions/in-progress")
  public async handleGetInProgressMissions(
    @Path() userId: number,
    @Query() cursor: number = 0,
  ): Promise<ApiResponse<InProgressMissionsListResponse>> {
    const result = await getInProgressMissions(userId, cursor);
    return success(result);
  }

  @Patch("{userId}/missions/{userMissionId}/complete")
  public async handleCompleteInProgressMission(
    @Path() userId: number,
    @Path() userMissionId: number,
  ): Promise<ApiResponse<UserMissionResponse>> {
    const result = await completeInProgressMission(userId, userMissionId);
    return success(result);
  }
}