/* tslint:disable */
/* eslint-disable */
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import type { TsoaRoute } from '@tsoa/runtime';
import {  fetchMiddlewares, ExpressTemplateService } from '@tsoa/runtime';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { UserController } from './../modules/users/controllers/user.controller.js';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { ShopController } from './../modules/shops/controllers/shop.controller.js';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { ReviewController } from './../modules/reviews/controllers/review.controller.js';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { UserReviewController } from './../modules/reviews/controllers/review.controller.js';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { ShopMissionController } from './../modules/missions/controllers/mission.controller.js';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { MissionController } from './../modules/missions/controllers/mission.controller.js';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { UserMissionController } from './../modules/missions/controllers/mission.controller.js';
import { expressAuthentication } from './../common/middlewares/auth.middleware.js';
// @ts-ignore - no great way to install types from subpackage
import type { Request as ExRequest, Response as ExResponse, RequestHandler, Router } from 'express';

const expressAuthenticationRecasted = expressAuthentication as (req: ExRequest, securityName: string, scopes?: string[], res?: ExResponse) => Promise<any>;


// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

const models: TsoaRoute.Models = {
    "UserSignUpResponse": {
        "dataType": "refObject",
        "properties": {
            "userId": {"dataType":"double","required":true},
            "preferences": {"dataType":"array","array":{"dataType":"string"},"required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ApiResponse_UserSignUpResponse_": {
        "dataType": "refObject",
        "properties": {
            "resultType": {"dataType":"enum","enums":["SUCCESS"],"required":true},
            "error": {"dataType":"enum","enums":[null],"required":true},
            "data": {"ref":"UserSignUpResponse","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ApiErrorBody": {
        "dataType": "refObject",
        "properties": {
            "errorCode": {"dataType":"string","required":true},
            "message": {"dataType":"string","required":true},
            "data": {"dataType":"any","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ApiFailedResponse": {
        "dataType": "refObject",
        "properties": {
            "resultType": {"dataType":"enum","enums":["FAILED"],"required":true},
            "error": {"ref":"ApiErrorBody","required":true},
            "data": {"dataType":"enum","enums":[null],"required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "UserSignUpRequest": {
        "dataType": "refObject",
        "properties": {
            "user_name": {"dataType":"string","required":true},
            "nickname": {"dataType":"string","required":true},
            "user_phone": {"dataType":"string","required":true},
            "user_gender": {"dataType":"union","subSchemas":[{"dataType":"enum","enums":["여성"]},{"dataType":"enum","enums":["남성"]}],"required":true},
            "birth_data": {"dataType":"string","required":true},
            "address": {"dataType":"string","required":true},
            "role": {"dataType":"union","subSchemas":[{"dataType":"enum","enums":["일반 사용자"]},{"dataType":"enum","enums":["가게 운영자"]}],"required":true},
            "point": {"dataType":"double","required":true},
            "email": {"dataType":"string","required":true},
            "preferences": {"dataType":"array","array":{"dataType":"double"},"required":true},
            "password": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "UserUpdateProfileResponse": {
        "dataType": "refObject",
        "properties": {
            "userId": {"dataType":"double","required":true},
            "preferences": {"dataType":"array","array":{"dataType":"string"},"required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ApiResponse_UserUpdateProfileResponse_": {
        "dataType": "refObject",
        "properties": {
            "resultType": {"dataType":"enum","enums":["SUCCESS"],"required":true},
            "error": {"dataType":"enum","enums":[null],"required":true},
            "data": {"ref":"UserUpdateProfileResponse","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "UserUpdateProfileRequest": {
        "dataType": "refObject",
        "properties": {
            "user_name": {"dataType":"string"},
            "nickname": {"dataType":"string"},
            "user_phone": {"dataType":"string"},
            "user_gender": {"dataType":"union","subSchemas":[{"dataType":"enum","enums":["여성"]},{"dataType":"enum","enums":["남성"]}]},
            "birth_data": {"dataType":"string"},
            "address": {"dataType":"string"},
            "preferences": {"dataType":"array","array":{"dataType":"double"}},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Express.User": {
        "dataType": "refObject",
        "properties": {
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ApiResponse__message-string--user-Express.User__": {
        "dataType": "refObject",
        "properties": {
            "resultType": {"dataType":"enum","enums":["SUCCESS"],"required":true},
            "error": {"dataType":"enum","enums":[null],"required":true},
            "data": {"dataType":"nestedObjectLiteral","nestedProperties":{"user":{"ref":"Express.User","required":true},"message":{"dataType":"string","required":true}},"required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ApiResponse__message-string--user_58__id-number--email-string--name-string___": {
        "dataType": "refObject",
        "properties": {
            "resultType": {"dataType":"enum","enums":["SUCCESS"],"required":true},
            "error": {"dataType":"enum","enums":[null],"required":true},
            "data": {"dataType":"nestedObjectLiteral","nestedProperties":{"user":{"dataType":"nestedObjectLiteral","nestedProperties":{"name":{"dataType":"string","required":true},"email":{"dataType":"string","required":true},"id":{"dataType":"double","required":true}},"required":true},"message":{"dataType":"string","required":true}},"required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ShopResponse": {
        "dataType": "refObject",
        "properties": {
            "shop_id": {"dataType":"double","required":true},
            "owner_id": {"dataType":"double","required":true},
            "region_id": {"dataType":"double","required":true},
            "region_name": {"dataType":"string","required":true},
            "shop_name": {"dataType":"string","required":true},
            "shop_position": {"dataType":"string","required":true},
            "shop_explain": {"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}],"required":true},
            "shop_phone": {"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}],"required":true},
            "status": {"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}],"required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ApiResponse_ShopResponse_": {
        "dataType": "refObject",
        "properties": {
            "resultType": {"dataType":"enum","enums":["SUCCESS"],"required":true},
            "error": {"dataType":"enum","enums":[null],"required":true},
            "data": {"ref":"ShopResponse","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ShopCreateRequest": {
        "dataType": "refObject",
        "properties": {
            "shop_name": {"dataType":"string","required":true},
            "shop_position": {"dataType":"string","required":true},
            "shop_explain": {"dataType":"string"},
            "shop_phone": {"dataType":"string"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ReviewCreateResponse": {
        "dataType": "refObject",
        "properties": {
            "review_id": {"dataType":"double","required":true},
            "shop_id": {"dataType":"double","required":true},
            "user_id": {"dataType":"double","required":true},
            "nickname": {"dataType":"string","required":true},
            "rating": {"dataType":"double","required":true},
            "body": {"dataType":"string","required":true},
            "image_urls": {"dataType":"array","array":{"dataType":"string"},"required":true},
            "created_date": {"dataType":"datetime","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ApiResponse_ReviewCreateResponse_": {
        "dataType": "refObject",
        "properties": {
            "resultType": {"dataType":"enum","enums":["SUCCESS"],"required":true},
            "error": {"dataType":"enum","enums":[null],"required":true},
            "data": {"ref":"ReviewCreateResponse","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ReviewCreateRequest": {
        "dataType": "refObject",
        "properties": {
            "user_mission_id": {"dataType":"double","required":true},
            "rating": {"dataType":"double","required":true},
            "body": {"dataType":"string","required":true},
            "image_urls": {"dataType":"array","array":{"dataType":"string"}},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ReviewsListResponse": {
        "dataType": "refObject",
        "properties": {
            "data": {"dataType":"array","array":{"dataType":"nestedObjectLiteral","nestedProperties":{"created_date":{"dataType":"datetime","required":true},"body":{"dataType":"string","required":true},"rating":{"dataType":"double","required":true},"nickname":{"dataType":"string","required":true},"review_id":{"dataType":"double","required":true}}},"required":true},
            "pagination": {"dataType":"nestedObjectLiteral","nestedProperties":{"cursor":{"dataType":"union","subSchemas":[{"dataType":"double"},{"dataType":"enum","enums":[null]}],"required":true}},"required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ApiResponse_ReviewsListResponse_": {
        "dataType": "refObject",
        "properties": {
            "resultType": {"dataType":"enum","enums":["SUCCESS"],"required":true},
            "error": {"dataType":"enum","enums":[null],"required":true},
            "data": {"ref":"ReviewsListResponse","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "MyReviewsListResponse": {
        "dataType": "refObject",
        "properties": {
            "data": {"dataType":"array","array":{"dataType":"nestedObjectLiteral","nestedProperties":{"created_date":{"dataType":"datetime","required":true},"body":{"dataType":"string","required":true},"rating":{"dataType":"double","required":true},"shop_name":{"dataType":"string","required":true},"shop_id":{"dataType":"double","required":true},"review_id":{"dataType":"double","required":true}}},"required":true},
            "pagination": {"dataType":"nestedObjectLiteral","nestedProperties":{"cursor":{"dataType":"union","subSchemas":[{"dataType":"double"},{"dataType":"enum","enums":[null]}],"required":true}},"required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ApiResponse_MyReviewsListResponse_": {
        "dataType": "refObject",
        "properties": {
            "resultType": {"dataType":"enum","enums":["SUCCESS"],"required":true},
            "error": {"dataType":"enum","enums":[null],"required":true},
            "data": {"ref":"MyReviewsListResponse","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "MissionResponse": {
        "dataType": "refObject",
        "properties": {
            "mission_id": {"dataType":"double","required":true},
            "shop_id": {"dataType":"double","required":true},
            "title": {"dataType":"string","required":true},
            "body": {"dataType":"string","required":true},
            "point": {"dataType":"double","required":true},
            "status": {"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}],"required":true},
            "created_date": {"dataType":"union","subSchemas":[{"dataType":"datetime"},{"dataType":"enum","enums":[null]}],"required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ApiResponse_MissionResponse_": {
        "dataType": "refObject",
        "properties": {
            "resultType": {"dataType":"enum","enums":["SUCCESS"],"required":true},
            "error": {"dataType":"enum","enums":[null],"required":true},
            "data": {"ref":"MissionResponse","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "MissionCreateRequest": {
        "dataType": "refObject",
        "properties": {
            "shop_id": {"dataType":"double","required":true},
            "title": {"dataType":"string","required":true},
            "body": {"dataType":"string","required":true},
            "point": {"dataType":"double","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "MissionsListResponse": {
        "dataType": "refObject",
        "properties": {
            "data": {"dataType":"array","array":{"dataType":"nestedObjectLiteral","nestedProperties":{"created_date":{"dataType":"union","subSchemas":[{"dataType":"datetime"},{"dataType":"enum","enums":[null]}],"required":true},"status":{"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}],"required":true},"point":{"dataType":"double","required":true},"body":{"dataType":"string","required":true},"title":{"dataType":"string","required":true},"shop_id":{"dataType":"double","required":true},"mission_id":{"dataType":"double","required":true}}},"required":true},
            "pagination": {"dataType":"nestedObjectLiteral","nestedProperties":{"cursor":{"dataType":"union","subSchemas":[{"dataType":"double"},{"dataType":"enum","enums":[null]}],"required":true}},"required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ApiResponse_MissionsListResponse_": {
        "dataType": "refObject",
        "properties": {
            "resultType": {"dataType":"enum","enums":["SUCCESS"],"required":true},
            "error": {"dataType":"enum","enums":[null],"required":true},
            "data": {"ref":"MissionsListResponse","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "UserMissionResponse": {
        "dataType": "refObject",
        "properties": {
            "user_mission_id": {"dataType":"double","required":true},
            "user_id": {"dataType":"double","required":true},
            "mission_id": {"dataType":"double","required":true},
            "status": {"dataType":"string","required":true},
            "created_date": {"dataType":"union","subSchemas":[{"dataType":"datetime"},{"dataType":"enum","enums":[null]}],"required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ApiResponse_UserMissionResponse_": {
        "dataType": "refObject",
        "properties": {
            "resultType": {"dataType":"enum","enums":["SUCCESS"],"required":true},
            "error": {"dataType":"enum","enums":[null],"required":true},
            "data": {"ref":"UserMissionResponse","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "UserMissionCreateRequest": {
        "dataType": "refObject",
        "properties": {
            "mission_id": {"dataType":"double","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "InProgressMissionsListResponse": {
        "dataType": "refObject",
        "properties": {
            "data": {"dataType":"array","array":{"dataType":"nestedObjectLiteral","nestedProperties":{"created_date":{"dataType":"union","subSchemas":[{"dataType":"datetime"},{"dataType":"enum","enums":[null]}],"required":true},"status":{"dataType":"string","required":true},"point":{"dataType":"double","required":true},"body":{"dataType":"string","required":true},"title":{"dataType":"string","required":true},"shop_id":{"dataType":"double","required":true},"mission_id":{"dataType":"double","required":true},"user_mission_id":{"dataType":"double","required":true}}},"required":true},
            "pagination": {"dataType":"nestedObjectLiteral","nestedProperties":{"cursor":{"dataType":"union","subSchemas":[{"dataType":"double"},{"dataType":"enum","enums":[null]}],"required":true}},"required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ApiResponse_InProgressMissionsListResponse_": {
        "dataType": "refObject",
        "properties": {
            "resultType": {"dataType":"enum","enums":["SUCCESS"],"required":true},
            "error": {"dataType":"enum","enums":[null],"required":true},
            "data": {"ref":"InProgressMissionsListResponse","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
};
const templateService = new ExpressTemplateService(models, {"noImplicitAdditionalProperties":"throw-on-extras","bodyCoercion":true});

// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa




export function RegisterRoutes(app: Router) {

    // ###########################################################################################################
    //  NOTE: If you do not see routes for all of your controllers in this file, then you might not have informed tsoa of where to look
    //      Please look into the "controllerPathGlobs" config option described in the readme: https://github.com/lukeautry/tsoa
    // ###########################################################################################################


    
        const argsUserController_handleUserSignUp: Record<string, TsoaRoute.ParameterSchema> = {
                body: {"in":"body","name":"body","required":true,"ref":"UserSignUpRequest"},
        };
        app.post('/users/signup',
            ...(fetchMiddlewares<RequestHandler>(UserController)),
            ...(fetchMiddlewares<RequestHandler>(UserController.prototype.handleUserSignUp)),

            async function UserController_handleUserSignUp(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsUserController_handleUserSignUp, request, response });

                const controller = new UserController();

              await templateService.apiHandler({
                methodName: 'handleUserSignUp',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsUserController_handleUpdateMyProfile: Record<string, TsoaRoute.ParameterSchema> = {
                body: {"in":"body","name":"body","required":true,"ref":"UserUpdateProfileRequest"},
                req: {"in":"request","name":"req","required":true,"dataType":"object"},
        };
        app.patch('/users/me',
            authenticateMiddleware([{"jwt":[]}]),
            ...(fetchMiddlewares<RequestHandler>(UserController)),
            ...(fetchMiddlewares<RequestHandler>(UserController.prototype.handleUpdateMyProfile)),

            async function UserController_handleUpdateMyProfile(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsUserController_handleUpdateMyProfile, request, response });

                const controller = new UserController();

              await templateService.apiHandler({
                methodName: 'handleUpdateMyProfile',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsUserController_handleMypage: Record<string, TsoaRoute.ParameterSchema> = {
                req: {"in":"request","name":"req","required":true,"dataType":"object"},
        };
        app.get('/users/mypage',
            authenticateMiddleware([{"jwt":[]}]),
            ...(fetchMiddlewares<RequestHandler>(UserController)),
            ...(fetchMiddlewares<RequestHandler>(UserController.prototype.handleMypage)),

            async function UserController_handleMypage(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsUserController_handleMypage, request, response });

                const controller = new UserController();

              await templateService.apiHandler({
                methodName: 'handleMypage',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsUserController_handleGuestPage: Record<string, TsoaRoute.ParameterSchema> = {
        };
        app.get('/users/guest',
            ...(fetchMiddlewares<RequestHandler>(UserController)),
            ...(fetchMiddlewares<RequestHandler>(UserController.prototype.handleGuestPage)),

            async function UserController_handleGuestPage(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsUserController_handleGuestPage, request, response });

                const controller = new UserController();

              await templateService.apiHandler({
                methodName: 'handleGuestPage',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsUserController_handleLoginPage: Record<string, TsoaRoute.ParameterSchema> = {
        };
        app.get('/users/login',
            ...(fetchMiddlewares<RequestHandler>(UserController)),
            ...(fetchMiddlewares<RequestHandler>(UserController.prototype.handleLoginPage)),

            async function UserController_handleLoginPage(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsUserController_handleLoginPage, request, response });

                const controller = new UserController();

              await templateService.apiHandler({
                methodName: 'handleLoginPage',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsShopController_handleCreateShop: Record<string, TsoaRoute.ParameterSchema> = {
                regionId: {"in":"path","name":"regionId","required":true,"dataType":"double"},
                body: {"in":"body","name":"body","required":true,"ref":"ShopCreateRequest"},
                req: {"in":"request","name":"req","required":true,"dataType":"object"},
        };
        app.post('/regions/:regionId/shops',
            authenticateMiddleware([{"jwt":[]}]),
            ...(fetchMiddlewares<RequestHandler>(ShopController)),
            ...(fetchMiddlewares<RequestHandler>(ShopController.prototype.handleCreateShop)),

            async function ShopController_handleCreateShop(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsShopController_handleCreateShop, request, response });

                const controller = new ShopController();

              await templateService.apiHandler({
                methodName: 'handleCreateShop',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsReviewController_handleCreateReview: Record<string, TsoaRoute.ParameterSchema> = {
                shopId: {"in":"path","name":"shopId","required":true,"dataType":"double"},
                body: {"in":"body","name":"body","required":true,"ref":"ReviewCreateRequest"},
                req: {"in":"request","name":"req","required":true,"dataType":"object"},
        };
        app.post('/shops/:shopId/reviews',
            authenticateMiddleware([{"jwt":[]}]),
            ...(fetchMiddlewares<RequestHandler>(ReviewController)),
            ...(fetchMiddlewares<RequestHandler>(ReviewController.prototype.handleCreateReview)),

            async function ReviewController_handleCreateReview(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsReviewController_handleCreateReview, request, response });

                const controller = new ReviewController();

              await templateService.apiHandler({
                methodName: 'handleCreateReview',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsReviewController_handleGetReviews: Record<string, TsoaRoute.ParameterSchema> = {
                shopId: {"in":"path","name":"shopId","required":true,"dataType":"double"},
                cursor: {"default":0,"in":"query","name":"cursor","dataType":"double"},
        };
        app.get('/shops/:shopId/reviews',
            ...(fetchMiddlewares<RequestHandler>(ReviewController)),
            ...(fetchMiddlewares<RequestHandler>(ReviewController.prototype.handleGetReviews)),

            async function ReviewController_handleGetReviews(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsReviewController_handleGetReviews, request, response });

                const controller = new ReviewController();

              await templateService.apiHandler({
                methodName: 'handleGetReviews',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsUserReviewController_handleGetMyReviews: Record<string, TsoaRoute.ParameterSchema> = {
                req: {"in":"request","name":"req","required":true,"dataType":"object"},
                cursor: {"default":0,"in":"query","name":"cursor","dataType":"double"},
        };
        app.get('/users/me/reviews',
            authenticateMiddleware([{"jwt":[]}]),
            ...(fetchMiddlewares<RequestHandler>(UserReviewController)),
            ...(fetchMiddlewares<RequestHandler>(UserReviewController.prototype.handleGetMyReviews)),

            async function UserReviewController_handleGetMyReviews(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsUserReviewController_handleGetMyReviews, request, response });

                const controller = new UserReviewController();

              await templateService.apiHandler({
                methodName: 'handleGetMyReviews',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsShopMissionController_handleCreateMission: Record<string, TsoaRoute.ParameterSchema> = {
                shopId: {"in":"path","name":"shopId","required":true,"dataType":"double"},
                body: {"in":"body","name":"body","required":true,"ref":"MissionCreateRequest"},
        };
        app.post('/shops/:shopId/missions',
            authenticateMiddleware([{"jwt":[]}]),
            ...(fetchMiddlewares<RequestHandler>(ShopMissionController)),
            ...(fetchMiddlewares<RequestHandler>(ShopMissionController.prototype.handleCreateMission)),

            async function ShopMissionController_handleCreateMission(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsShopMissionController_handleCreateMission, request, response });

                const controller = new ShopMissionController();

              await templateService.apiHandler({
                methodName: 'handleCreateMission',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsShopMissionController_handleGetMissions: Record<string, TsoaRoute.ParameterSchema> = {
                shopId: {"in":"path","name":"shopId","required":true,"dataType":"double"},
                cursor: {"default":0,"in":"query","name":"cursor","dataType":"double"},
        };
        app.get('/shops/:shopId/missions',
            ...(fetchMiddlewares<RequestHandler>(ShopMissionController)),
            ...(fetchMiddlewares<RequestHandler>(ShopMissionController.prototype.handleGetMissions)),

            async function ShopMissionController_handleGetMissions(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsShopMissionController_handleGetMissions, request, response });

                const controller = new ShopMissionController();

              await templateService.apiHandler({
                methodName: 'handleGetMissions',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsMissionController_handleChallengeMission: Record<string, TsoaRoute.ParameterSchema> = {
                body: {"in":"body","name":"body","required":true,"ref":"UserMissionCreateRequest"},
                req: {"in":"request","name":"req","required":true,"dataType":"object"},
        };
        app.post('/missions/challenge',
            authenticateMiddleware([{"jwt":[]}]),
            ...(fetchMiddlewares<RequestHandler>(MissionController)),
            ...(fetchMiddlewares<RequestHandler>(MissionController.prototype.handleChallengeMission)),

            async function MissionController_handleChallengeMission(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsMissionController_handleChallengeMission, request, response });

                const controller = new MissionController();

              await templateService.apiHandler({
                methodName: 'handleChallengeMission',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsUserMissionController_handleGetInProgressMissions: Record<string, TsoaRoute.ParameterSchema> = {
                req: {"in":"request","name":"req","required":true,"dataType":"object"},
                cursor: {"default":0,"in":"query","name":"cursor","dataType":"double"},
        };
        app.get('/users/me/missions/in-progress',
            authenticateMiddleware([{"jwt":[]}]),
            ...(fetchMiddlewares<RequestHandler>(UserMissionController)),
            ...(fetchMiddlewares<RequestHandler>(UserMissionController.prototype.handleGetInProgressMissions)),

            async function UserMissionController_handleGetInProgressMissions(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsUserMissionController_handleGetInProgressMissions, request, response });

                const controller = new UserMissionController();

              await templateService.apiHandler({
                methodName: 'handleGetInProgressMissions',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsUserMissionController_handleCompleteInProgressMission: Record<string, TsoaRoute.ParameterSchema> = {
                userMissionId: {"in":"path","name":"userMissionId","required":true,"dataType":"double"},
                req: {"in":"request","name":"req","required":true,"dataType":"object"},
        };
        app.patch('/users/me/missions/:userMissionId/complete',
            authenticateMiddleware([{"jwt":[]}]),
            ...(fetchMiddlewares<RequestHandler>(UserMissionController)),
            ...(fetchMiddlewares<RequestHandler>(UserMissionController.prototype.handleCompleteInProgressMission)),

            async function UserMissionController_handleCompleteInProgressMission(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsUserMissionController_handleCompleteInProgressMission, request, response });

                const controller = new UserMissionController();

              await templateService.apiHandler({
                methodName: 'handleCompleteInProgressMission',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa


    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

    function authenticateMiddleware(security: TsoaRoute.Security[] = []) {
        return async function runAuthenticationMiddleware(request: any, response: any, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            // keep track of failed auth attempts so we can hand back the most
            // recent one.  This behavior was previously existing so preserving it
            // here
            const failedAttempts: any[] = [];
            const pushAndRethrow = (error: any) => {
                failedAttempts.push(error);
                throw error;
            };

            const secMethodOrPromises: Promise<any>[] = [];
            for (const secMethod of security) {
                if (Object.keys(secMethod).length > 1) {
                    const secMethodAndPromises: Promise<any>[] = [];

                    for (const name in secMethod) {
                        secMethodAndPromises.push(
                            expressAuthenticationRecasted(request, name, secMethod[name], response)
                                .catch(pushAndRethrow)
                        );
                    }

                    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

                    secMethodOrPromises.push(Promise.all(secMethodAndPromises)
                        .then(users => { return users[0]; }));
                } else {
                    for (const name in secMethod) {
                        secMethodOrPromises.push(
                            expressAuthenticationRecasted(request, name, secMethod[name], response)
                                .catch(pushAndRethrow)
                        );
                    }
                }
            }

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            try {
                request['user'] = await Promise.any(secMethodOrPromises);

                // Response was sent in middleware, abort
                if (response.writableEnded) {
                    return;
                }

                next();
            }
            catch(err) {
                // Show most recent error as response
                const error = failedAttempts.pop();
                error.status = error.status || 401;

                // Response was sent in middleware, abort
                if (response.writableEnded) {
                    return;
                }
                next(error);
            }

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        }
    }

    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
}

// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
