import {
  type FastifyRequest,
  type FastifyInstance,
  type FastifyReply,
} from 'fastify';
import { type ZodTypeProvider } from 'fastify-type-provider-zod';

import { type FastifyResponse } from '@/core';
import { type User } from '@prisma/client';

import { UserController } from '../../application/controllers/user.contoller';
import { type CreateUserType, createUserSchema } from '../../domain/schemas';

export type CreateUserResponse = Omit<User, 'password'>;

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
    ): Promise<FastifyResponse<CreateUserResponse>> =>
      await new UserController().create(request, reply),
  });
};
