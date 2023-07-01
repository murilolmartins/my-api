import { StatusCodes } from 'http-status-codes';

import type { FastifyResponse } from '@/core';

import type { UserEntity } from '../../domain/entities';
import type { CreateUserType } from '../../domain/schemas/create-user.schema';
import type { UserRepository } from '../repositories';

export class CreateUserUseCase {
  constructor(private readonly repository: UserRepository) {}

  async execute(
    userData: CreateUserType,
  ): Promise<FastifyResponse<UserEntity>> {
    const hasUser = await this.validateIfUserIsDuplicated(userData.email);

    if (hasUser) {
      return {
        statusCode: StatusCodes.CONFLICT,
        message: 'User already exists',
        errors: ['Conflict'],
        data: null,
      };
    }

    const createdUser = await this.repository.create(userData);

    return {
      statusCode: 201,
      message: 'User created successfully',
      data: createdUser,
      errors: null,
    };
  }

  async validateIfUserIsDuplicated(email: string) {
    const user = await this.repository.findByEmail(email);
    return !!user;
  }
}
