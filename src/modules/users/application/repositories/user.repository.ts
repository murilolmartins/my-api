import type { UserEntity } from '../../domain/entities';
import type { CreateUserType } from '../../domain/schemas/create-user.schema';

export type UserRepository = {
  create(userData: CreateUserType): Promise<UserEntity>;
  findAll(): Promise<UserEntity[] | []>;
  findByEmail(email: string): Promise<UserEntity | undefined>;
};
