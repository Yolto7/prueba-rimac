export class AppError extends Error {
  errorCode: string;
  payload: any;

  constructor(errorCode: string, message: string, payload: any = undefined) {
    super(message);

    this.errorCode = errorCode;
    this.message = message;
    this.payload = payload;
  }
}

export const ERRORS = {
  NOT_FOUND: 'ERR_NOT_FOUND',
  DB_ERROR: 'ERR_DATABASE',
  PAYLOAD_ERROR: 'ERR_PAYLOAD_INVALID',
  SCHEMA_VALIDATION: 'ERR_SCHEMA_VALIDATION',
};
