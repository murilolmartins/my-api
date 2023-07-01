import { UserMemoryRepository } from '@/modules/users/infra/repositories/memory';
import { createUserMock } from '@test/createMockData';

import type { UserRepository } from '../../repositories';
import { CreateUserUseCase } from '../create-user.usecase';

describe('CreateUserUseCase', () => {
  let createUserUseCase: CreateUserUseCase;
  let userRepository: UserRepository;

  beforeEach(() => {
    userRepository = new UserMemoryRepository();
    createUserUseCase = new CreateUserUseCase(userRepository);
  });

  it('should create a new user', async () => {
    const userData = createUserMock();

    const createUserReturn = await createUserUseCase.execute(userData);
    const users = await userRepository.findAll();

    expect(createUserReturn.errors).toBe(null);
    expect(createUserReturn.data).toHaveProperty('id');
    expect(users).toHaveLength(1);
    expect(users[0]).toEqual(createUserReturn.data);
  });

  it('should not create a new user with an existent email', async () => {
    const fixTures = [{ email: 'mail@mail.com' }, { email: 'mail@mail.com' }];

    const users = fixTures.map((fixture) => {
      return createUserMock(fixture);
    });

    await createUserUseCase.execute(users[0]);
    const createUserReturn = await createUserUseCase.execute(users[1]);

    expect(createUserReturn.errors).toEqual(['Conflict']);
    expect(createUserReturn.statusCode).toBe(409);
    expect(createUserReturn.data).toBe(null);
  });
});
