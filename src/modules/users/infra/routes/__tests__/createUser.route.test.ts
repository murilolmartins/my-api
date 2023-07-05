import { type FastifyInstance } from 'fastify';
import { StatusCodes } from 'http-status-codes';
import timekeeper from 'timekeeper';

import { buildApp } from '@/infra/app';
import prisma from '@/infra/prisma';
import { createUserMock } from '@test/createMockData';
import { PrismaCleaner } from '@test/utils';

let app: FastifyInstance;
const prismaCleaner = new PrismaCleaner(prisma);
const date = new Date('2023-07-03 00:00:00');
timekeeper.freeze(date);

beforeAll(async () => {
  app = await buildApp(prisma);
});

beforeEach(async () => {
  await prismaCleaner.clean();
});

afterAll(async () => {
  await prisma.$disconnect();
  await app.close();
});

describe('CreateUserRoute', () => {
  it('should create a new user', async () => {
    const user = createUserMock({
      birthdate: new Date('1996-05-01 00:00:00'),
    });

    const response = await app.inject({
      method: 'POST',
      url: '/user',
      payload: user,
    });

    const users = await prisma.user.findMany();

    expect(response.statusCode).toBe(201);
    expect(JSON.parse(response.body)).toMatchObject({
      data: {
        age: 27,
        id: expect.any(String),
        name: user.name,
        email: user.email,
        birthdate: user.birthdate.toISOString(),
        createdAt: date.toISOString(),
        updatedAt: date.toISOString(),
      },
      errors: null,
      statusCode: StatusCodes.CREATED,
    });
    expect(users).toHaveLength(1);
    expect(users[0]).toMatchObject({
      id: expect.any(String),
      name: user.name,
      email: user.email,
      age: 27,
      birthdate: user.birthdate,
      password: expect.any(String),
      createdAt: date,
      updatedAt: date,
    });
  });
});
