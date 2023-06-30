import type { CreateUserType } from '../../domain/schemas/create-user.schema';
import type { UserRepository } from '../repositories';

export class CreateUserUseCase {
  constructor(private readonly repository: UserRepository) {}

  async execute(userData: CreateUserType) {
    const createdUser = await this.repository.create(userData);
    return createdUser;
  }
}
