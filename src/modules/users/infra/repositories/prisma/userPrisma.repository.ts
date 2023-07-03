import { type UserRepository } from '@/modules/users/application/repositories';
import { type CreateUserType } from '@/modules/users/domain/schemas';
import { type PrismaClient, type User } from '@prisma/client';

export class UserPrismaRepository implements UserRepository {
  constructor(private readonly prisma: PrismaClient) {}

  public async create(userData: CreateUserType): Promise<User> {
    const user = await this.prisma.user.create({ data: userData });

    return user;
  }

  public async findAll(): Promise<User[]> {
    const users = await this.prisma.user.findMany();

    return users;
  }

  public async findByEmail(email: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({ where: { email } });

    return user;
  }
}
