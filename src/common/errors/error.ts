import { AppError } from "./app.error.js";

export class DuplicateUserEmailError extends AppError {
  constructor(message: string, data?: unknown) {
    super({
      errorCode: "U001",
      statusCode: 409,
      message,
      data,
    });
  }
}

export class NotFoundError extends AppError {
  constructor(message: string, data?: unknown) {
    super({
      errorCode: "COMMON404",
      statusCode: 404,
      message,
      data,
    });
  }
}

export class ValidationError extends AppError {
  constructor(message: string, data?: unknown) {
    super({
      errorCode: "COMMON400",
      statusCode: 400,
      message,
      data,
    });
  }
}

export class ConflictError extends AppError {
  constructor(message: string, data?: unknown) {
    super({
      errorCode: "COMMON409",
      statusCode: 409,
      message,
      data,
    });
  }
}

export class InternalServerError extends AppError {
  constructor(message: string, data?: unknown) {
    super({
      errorCode: "COMMON500",
      statusCode: 500,
      message,
      data,
    });
  }
}
