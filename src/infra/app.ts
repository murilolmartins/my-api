import fastify from 'fastify';
import {
  serializerCompiler,
  validatorCompiler,
} from 'fastify-type-provider-zod';
import { z } from 'zod';

import { zodSchemaValidationErrorParse } from '@/core';

import { AppRoutes } from './routes';

const app = fastify({
  logger: {
    transport: {
      target: 'pino-pretty',
    },
  },
});

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

app.setErrorHandler(function (error, _, reply) {
  if (error instanceof z.ZodError) {
    reply.statusCode = 400;

    return zodSchemaValidationErrorParse(error);
  }
  return error;
});

void AppRoutes(app);

export { app };
