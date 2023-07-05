import type { CreateUserType } from '@/modules/users/domain/schemas/createUser.schema';
import { faker } from '@faker-js/faker';

export const createUserMock = (
  userData: Partial<CreateUserType> = {},
): CreateUserType => {
  const defaultUserData: CreateUserType = {
    name: faker.person.fullName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    birthdate: faker.date.past(),
    ...userData,
  };

  return defaultUserData;
};
