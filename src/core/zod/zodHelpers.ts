import { StatusCodes } from 'http-status-codes';
import type { z } from 'zod';

import { AppError } from '../errors/app.error';

export const zodSchemaValidationErrorParse = (error: z.ZodError): AppError => {
  const errorResponse = {
    statusCode: StatusCodes.BAD_REQUEST,
    errors: error.errors.map((error) => ({
      code: error.code.toUpperCase(),
      message: error.message,
    })),
  };

  return new AppError(errorResponse.statusCode, errorResponse.errors);
};
