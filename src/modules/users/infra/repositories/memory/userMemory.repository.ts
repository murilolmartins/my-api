import type { UserRepository } from '@/modules/users/application/repositories';
import { UserEntity } from '@/modules/users/domain/entities';
import type { CreateUserType } from '@/modules/users/domain/schemas/create-user.schema';

export class UserMemoryRepository implements UserRepository {
  private users: UserEntity[] = [];

  public async create(userData: CreateUserType): Promise<UserEntity> {
    const user = new UserEntity(userData);

    this.users.push(user);

    return user;
  }

  public async findAll(): Promise<UserEntity[] | []> {
    return this.users;
  }

  public async findByEmail(email: string): Promise<UserEntity | undefined> {
    const user = this.users.find((user) => user.email === email);

    return user;
  }
}
