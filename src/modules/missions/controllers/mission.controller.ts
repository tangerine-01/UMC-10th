import { Body, Controller, Example, Get, Patch, Path, Post, Query, Response, Route, Tags } from "tsoa";
import { ApiFailedResponse, ApiResponse, success } from "../../../common/responses/response.js";
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
  /**
   * 가게 미션 등록 API
   * @summary 특정 가게에 새 미션을 등록합니다.
   * @param shopId 미션을 등록할 가게 ID
   */
  @Post("{shopId}/missions")
  @Example<MissionCreateRequest>({
    shop_id: 1,
    title: "리뷰 작성 미션",
    body: "리뷰를 작성하면 포인트를 드려요",
    point: 100,
  })
  @Response<ApiResponse<MissionResponse>>(200, "미션 등록 성공")
  @Response<ApiFailedResponse>(400, "요청 형식 오류 (COMMON400)")
  @Response<ApiFailedResponse>(404, "존재하지 않는 가게 (COMMON404)")
  @Response<ApiFailedResponse>(500, "서버 오류 (COMMON500)")
  public async handleCreateMission(
    @Path() shopId: number,
    @Body() body: MissionCreateRequest,
  ): Promise<ApiResponse<MissionResponse>> {
    const data = bodyToMission(body, shopId);
    const mission = await createMission(data);
    return success(mission);
  }

  /**
   * 가게 미션 목록 조회 API
   * @summary 특정 가게의 미션 목록을 커서 기반으로 조회합니다.
   * @param shopId 가게 ID
   * @param cursor 페이지네이션 커서 (기본값 0)
   */
  @Get("{shopId}/missions")
  @Response<ApiResponse<MissionsListResponse>>(200, "미션 목록 조회 성공")
  @Response<ApiFailedResponse>(400, "요청 형식 오류 (COMMON400)")
  @Response<ApiFailedResponse>(404, "존재하지 않는 가게 (COMMON404)")
  @Response<ApiFailedResponse>(500, "서버 오류 (COMMON500)")
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
  /**
   * 미션 도전 API
   * @summary 유저가 미션에 도전(진행 중 상태로 등록)합니다.
   */
  @Post("challenge")
  @Example<UserMissionCreateRequest>({
    user_id: 1,
    mission_id: 1,
  })
  @Response<ApiResponse<UserMissionResponse>>(200, "미션 도전 성공")
  @Response<ApiFailedResponse>(400, "요청 형식 오류 (COMMON400)")
  @Response<ApiFailedResponse>(404, "존재하지 않는 미션 (COMMON404)")
  @Response<ApiFailedResponse>(409, "이미 도전 중인 미션 (COMMON409)")
  @Response<ApiFailedResponse>(500, "서버 오류 (COMMON500)")
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
  /**
   * 진행 중인 미션 목록 조회 API
   * @summary 유저의 진행 중(IN_PROGRESS) 미션 목록을 커서 기반으로 조회합니다.
   * @param userId 유저 ID
   * @param cursor 페이지네이션 커서 (기본값 0)
   */
  @Get("{userId}/missions/in-progress")
  @Response<ApiResponse<InProgressMissionsListResponse>>(200, "진행 중 미션 목록 조회 성공")
  @Response<ApiFailedResponse>(400, "요청 형식 오류 (COMMON400)")
  @Response<ApiFailedResponse>(404, "존재하지 않는 유저 (COMMON404)")
  @Response<ApiFailedResponse>(500, "서버 오류 (COMMON500)")
  public async handleGetInProgressMissions(
    @Path() userId: number,
    @Query() cursor: number = 0,
  ): Promise<ApiResponse<InProgressMissionsListResponse>> {
    const result = await getInProgressMissions(userId, cursor);
    return success(result);
  }

  /**
   * 진행 중 미션 완료 처리 API
   * @summary 유저의 진행 중 미션을 완료(COMPLETED) 상태로 변경합니다.
   * @param userId 유저 ID
   * @param userMissionId 유저 미션 ID
   */
  @Patch("{userId}/missions/{userMissionId}/complete")
  @Response<ApiResponse<UserMissionResponse>>(200, "미션 완료 처리 성공")
  @Response<ApiFailedResponse>(400, "요청 형식 오류·진행 중이 아닌 미션 (COMMON400)")
  @Response<ApiFailedResponse>(404, "존재하지 않는 유저 또는 유저 미션 (COMMON404)")
  @Response<ApiFailedResponse>(500, "서버 오류 (COMMON500)")
  public async handleCompleteInProgressMission(
    @Path() userId: number,
    @Path() userMissionId: number,
  ): Promise<ApiResponse<UserMissionResponse>> {
    const result = await completeInProgressMission(userId, userMissionId);
    return success(result);
  }
}
