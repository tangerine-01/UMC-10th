export interface ApiResponse<T> {
  resultType: "SUCCESS";
  error: null;
  data: T;
}

export interface ApiErrorBody {
  errorCode: string;
  message: string;
  data: unknown;
}

/** 전역 에러 핸들러(res.error)가 내려주는 실패 응답 형식 */
export interface ApiFailedResponse {
  resultType: "FAILED";
  error: ApiErrorBody;
  data: null;
}

export const success = <T>(data: T): ApiResponse<T> => ({
  resultType: "SUCCESS",
  error: null,
  data,
});