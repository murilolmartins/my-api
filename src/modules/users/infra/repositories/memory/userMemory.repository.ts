import type { UserRepository } from '@/modules/users/application/repositories';
import { type UserEntity } from '@/modules/users/domain/entities';

export class UserMemoryRepository implements UserRepository {
  private readonly users: UserEntity[] = [];

  public async create(userData: UserEntity): Promise<UserEntity> {
    this.users.push(userData);

    return userData;
  }

  public async findAll(): Promise<UserEntity[] | []> {
    return this.users;
  }

  public async findByEmail(email: string): Promise<UserEntity | null> {
    const user = this.users.find((user) => user.email === email);

    return typeof user === 'undefined' ? null : user;
  }
}
