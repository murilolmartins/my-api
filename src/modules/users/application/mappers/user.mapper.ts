import { type User } from '@prisma/client';

export class UserMapper {
  fromDatabaseToDomain(userData: User): Omit<User, 'password'> {
    return {
      id: userData.id,
      name: userData.name,
      email: userData.email,
      birthdate: userData.birthdate,
      age: userData.age,
      createdAt: userData.createdAt,
      updatedAt: userData.updatedAt,
    };
  }
}
