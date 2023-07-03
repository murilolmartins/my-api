import { type User } from '@prisma/client';

import { type UserEntity } from '../../domain/entities';

export interface UserRepository {
  create: (userData: UserEntity) => Promise<User | UserEntity>;
  findAll: () => Promise<User[] | UserEntity[] | []>;
  findByEmail: (email: string) => Promise<User | UserEntity | null>;
}
