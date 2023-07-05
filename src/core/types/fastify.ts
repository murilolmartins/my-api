import { type AppError } from '../errors/app.error';
import { type Either } from '../errors/either.error';

export class AppSuccess<T> {
  readonly statusCode: number;
  readonly errors: null;
  readonly data: T;

  constructor(statusCode: number, data: T) {
    this.statusCode = statusCode;
    this.errors = null;
    this.data = data;
  }
}

export type FastifyResponse<T> = Either<AppError, AppSuccess<T>>;
