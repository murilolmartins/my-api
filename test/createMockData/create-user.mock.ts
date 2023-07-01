import type { CreateUserType } from '@/modules/users/domain/schemas/create-user.schema';
import { faker } from '@faker-js/faker';

export const createUserMock = (
  userData: Partial<CreateUserType> = {},
): CreateUserType => {
  const defaultUserData: CreateUserType = {
    name: faker.person.fullName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    birthDate: faker.date.past(),
    ...userData,
  };

  return defaultUserData;
};
