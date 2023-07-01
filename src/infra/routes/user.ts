import type {
  FastifyInstance,
  FastifyPluginAsync,
  FastifyPluginOptions,
} from 'fastify';
import type { ZodTypeProvider } from 'fastify-type-provider-zod';
import { z } from 'zod';

import { zodSchemaValidationErrorParse } from '@/core';
import { CreateUserUseCase } from '@/modules/users/application/usecases';
import { createUserSchema } from '@/modules/users/domain/schemas';
import { UserMemoryRepository } from '@/modules/users/infra/repositories/memory';

const userRoutes: FastifyPluginAsync = async (
  app: FastifyInstance,
  options: FastifyPluginOptions,
) => {
  app.withTypeProvider<ZodTypeProvider>().route({
    method: 'POST',
    url: '/',
    schema: {
      body: createUserSchema,
    },
    errorHandler(error, _, reply) {
      if (error instanceof z.ZodError) {
        const errorResponse = zodSchemaValidationErrorParse(error);

        reply.statusCode = errorResponse.statusCode;
        reply.send(errorResponse);
      }
    },
    handler: async (request, reply) => {
      const createUserUseCase = new CreateUserUseCase(
        new UserMemoryRepository(),
      );

      const createUserReturn = await createUserUseCase.execute(request.body);

      reply.statusCode = createUserReturn.statusCode;

      reply.send(createUserReturn);
    },
  });
};

export default userRoutes;
