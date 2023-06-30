import type { UserEntity } from '../../domain/entities';
import type { CreateUserType } from '../../domain/schemas/create-user.schema';

export type UserRepository = {
  create(userData: CreateUserType): Promise<UserEntity>;
};
