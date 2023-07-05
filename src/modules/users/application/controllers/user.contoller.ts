import { type FastifyReply, type FastifyRequest } from 'fastify';
import { StatusCodes } from 'http-status-codes';

import { type FastifyResponse } from '@/core';

import { type CreateUserType } from '../../domain/schemas';
import { UserPrismaRepository } from '../../infra/repositories/prisma/userPrisma.repository';
import { type CreateUserResponse } from '../../infra/routes/createUser.route';
import { UserMapper } from '../mappers';
import { CreateUserUseCase } from '../usecases';

export class UserController {
  async create(
    request: FastifyRequest<{ Body: CreateUserType }>,
    reply: FastifyReply,
  ): Promise<FastifyResponse<CreateUserResponse>> {
    const createUserUseCase = new CreateUserUseCase(
      new UserPrismaRepository(request.prisma),
      new UserMapper(),
    );

    const createUserReturn = await createUserUseCase.execute(request.body);

    if (createUserReturn.isLeft()) {
      reply.statusCode = createUserReturn.value.statusCode;
      return reply.send(createUserReturn.value);
    }

    reply.statusCode = StatusCodes.CREATED;

    return reply.send(createUserReturn.value);
  }
}
