import { StatusCodes } from 'http-status-codes';

import { AppSuccess, type FastifyResponse } from '@/core';
import { AppError } from '@/core/errors/app.error';
import { left, right } from '@/core/errors/either.error';
import { type User } from '@prisma/client';

import { UserEntity } from '../../domain/entities';
import { UserErrors } from '../../domain/enums';
import type { CreateUserType } from '../../domain/schemas/createUser.schema';
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
      return left(
        new AppError(StatusCodes.CONFLICT, [
          {
            message: 'User already exists',
            code: UserErrors.USER_ALREADY_EXISTS,
          },
        ]),
      );
    }

    const user = new UserEntity(userData);

    await user.encryptPassword();

    const createdUser = await this.repository.create(user);

    if (!createdUser?.id) {
      left(
        new AppError(StatusCodes.INTERNAL_SERVER_ERROR, [
          {
            message: 'Error creating user',
            code: UserErrors.ERROR_CREATING_USER,
          },
        ]),
      );
    }

    return right(
      new AppSuccess(
        StatusCodes.CREATED,
        this.mapper.fromDatabaseToDomain(createdUser),
      ),
    );
  }

  async validateIfUserIsDuplicated(email: string): Promise<boolean> {
    const user = await this.repository.findByEmail(email);
    return !(user == null);
  }
}
