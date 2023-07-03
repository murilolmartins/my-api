import type { z } from 'zod';

import type { FastifyResponse } from '../types';

export const zodSchemaValidationErrorParse = (
  error: z.ZodError,
): FastifyResponse<null> => {
  const errorResponse = {
    statusCode: 400,
    errors: error.errors.map((error) => ({
      code: error.code.toUpperCase(),
      message: error.message,
    })),
    data: null,
  };

  return errorResponse;
};
