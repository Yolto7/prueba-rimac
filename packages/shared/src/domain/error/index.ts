export class AppError extends Error {
  errorCode: string;
  httpCode: number;
  payload: unknown;

  constructor(
    errorType: ErrorTypes,
    message: string,
    errorCode: string,
    payload: unknown = undefined
  ) {
    super(message);

    this.httpCode = HTTP_CODE_BY_ERROR[errorType] || 400;
    this.message = message;
    this.errorCode = errorCode;
    this.payload = payload;
  }
}

export enum ErrorTypes {
  BAD_REQUEST = 'BAD_REQUEST',
  UNAUTHORIZED = 'UNAUTHORIZED',
  NOT_FOUND = 'NOT_FOUND',
  NOT_ALLOWED = 'NOT_ALLOWED',
  UNPROCESSABLE_ENTITY = 'UNPROCESSABLE_ENTITY',
}

const HTTP_CODE_BY_ERROR: { [key: string]: number } = {
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  NOT_FOUND: 404,
  NOT_ALLOWED: 405,
  UNPROCESSABLE_ENTITY: 422,
};
