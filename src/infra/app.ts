import fastify, { type FastifyInstance } from 'fastify';
import {
  serializerCompiler,
  validatorCompiler,
} from 'fastify-type-provider-zod';
import { z } from 'zod';

import { zodSchemaValidationErrorParse } from '@/core';
import { AppError } from '@/core/errors/app.error';
import { Prisma, type PrismaClient } from '@prisma/client';

import { envVars } from './env';
import { AppRoutes } from './routes';

const buildApp = async (prisma: PrismaClient): Promise<FastifyInstance> => {
  const app = fastify({
    logger:
      envVars.NODE_ENV === 'development'
        ? {
            transport: {
              target: 'pino-pretty',
            },
          }
        : false,
  });

  app.addHook('onRequest', async (req) => {
    req.prisma = prisma;
  });

  app.setValidatorCompiler(validatorCompiler);
  app.setSerializerCompiler(serializerCompiler);

  app.setErrorHandler(function (error, _, reply) {
    if (error instanceof z.ZodError) {
      reply.statusCode = 400;

      return zodSchemaValidationErrorParse(error);
    }

    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      app.log.fatal(error.code, error.message);
      return new AppError(500, [
        { code: 'INTERNAL_SERVER_ERROR', message: 'Internal server error' },
      ]);
    }

    return error;
  });

  app.get('/healthcheck', async () => {
    return { status: 'ok' };
  });

  await AppRoutes(app);

  return app;
};

export { buildApp };
