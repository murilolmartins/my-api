import {
  type FastifyRequest,
  type FastifyInstance,
  type FastifyReply,
} from 'fastify';
import { type ZodTypeProvider } from 'fastify-type-provider-zod';

import { UserMapper } from '../../application/mappers';
import { CreateUserUseCase } from '../../application/usecases';
import { type CreateUserType, createUserSchema } from '../../domain/schemas';
import { UserPrismaRepository } from '../repositories/prisma/userPrisma.repository';

export const createUserRoute = (app: FastifyInstance): void => {
  app.withTypeProvider<ZodTypeProvider>().route({
    method: 'POST',
    url: '/',
    schema: {
      body: createUserSchema,
    },
    handler: async (
      request: FastifyRequest<{ Body: CreateUserType }>,
      reply: FastifyReply,
    ) => {
      const createUserUseCase = new CreateUserUseCase(
        new UserPrismaRepository(app.prisma),
        new UserMapper(),
      );

      const createUserReturn = await createUserUseCase.execute(request.body);

      reply.statusCode = createUserReturn.statusCode;

      return reply.send(createUserReturn);
    },
  });
};
