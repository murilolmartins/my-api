import { StatusCodes } from 'http-status-codes';

import type { FastifyResponse } from '@/core';
import { type User } from '@prisma/client';

import { UserEntity } from '../../domain/entities';
import { UserErrors } from '../../domain/enums';
import type { CreateUserType } from '../../domain/schemas/create-user.schema';
import { type UserMapper } from '../mappers/user.mapper';
import type { UserRepository } from '../repositories';

export class CreateUserUseCase {
  constructor(
    private readonly repository: UserRepository,
    private readonly mapper: UserMapper,
  ) {}

  async execute(
    userData: CreateUserType,
  ): Promise<FastifyResponse<Omit<User, 'password'>>> {
    const hasUser = await this.validateIfUserIsDuplicated(userData.email);

    if (hasUser) {
      return {
        statusCode: StatusCodes.CONFLICT,
        errors: [
          {
            message: 'User already exists',
            code: UserErrors.USER_ALREADY_EXISTS,
          },
        ],

        data: null,
      };
    }

    const user = new UserEntity(userData);

    await user.encryptPassword();

    const createdUser = await this.repository.create(user);

    return {
      statusCode: 201,
      data: this.mapper.fromDatabaseToDomain(createdUser),
      errors: null,
    };
  }

  async validateIfUserIsDuplicated(email: string): Promise<boolean> {
    const user = await this.repository.findByEmail(email);
    return !(user == null);
  }
}
