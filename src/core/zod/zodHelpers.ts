import type { z } from 'zod';

export const zodSchemaValidationErrorParse = (error: z.ZodError) => {
  const errorResponse = {
    statusCode: 400,
    message: 'Bad Request',
    errors: error.errors,
    data: null,
  };

  return errorResponse;
};
