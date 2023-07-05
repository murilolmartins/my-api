import { StatusCodes } from 'http-status-codes';

interface IError {
  code: string;
  message: string;
}

export class AppError {
  readonly statusCode: StatusCodes;
  readonly errors: IError[];
  readonly data = null;

  constructor(
    statusCode = StatusCodes.INTERNAL_SERVER_ERROR,
    errors: IError[],
  ) {
    this.statusCode = statusCode;
    this.errors = errors;
    this.data = null;
  }
}
