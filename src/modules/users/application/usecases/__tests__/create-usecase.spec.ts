import timekepper from 'timekeeper';

import { UserErrors } from '@/modules/users/domain/enums';
import { UserMemoryRepository } from '@/modules/users/infra/repositories/memory';
import { createUserMock } from '@test/createMockData';

import { UserMapper } from '../../mappers/user.mapper';
import type { UserRepository } from '../../repositories';
import { CreateUserUseCase } from '../createUser.usecase';

let createUserUseCase: CreateUserUseCase;
let userRepository: UserRepository;
let mapper: UserMapper;

beforeAll(() => {
  timekepper.freeze(new Date('2023-07-03 00:00:00'));
});

beforeEach(() => {
  userRepository = new UserMemoryRepository();
  mapper = new UserMapper();
  createUserUseCase = new CreateUserUseCase(userRepository, mapper);
});

describe('CreateUserUseCase', () => {
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

    expect(createUserReturn.errors).toEqual([
      {
        message: 'User already exists',
        code: UserErrors.USER_ALREADY_EXISTS,
      },
    ]);
    expect(createUserReturn.statusCode).toBe(409);
    expect(createUserReturn.data).toBe(null);
  });

  it('should create a user with encrypt the password', async () => {
    const userData = createUserMock({ birthdate: new Date('1996-05-01') });

    const createUserReturn = await createUserUseCase.execute(userData);
    const users = await userRepository.findAll();

    expect(createUserReturn.errors).toBe(null);
    expect(users).toHaveLength(1);
    expect(users[0].password).not.toBe(userData.password);
    expect(createUserReturn.data).not.toHaveProperty('password');
  });
});
