import prisma from '@/infra/prisma';
import { createUserMock } from '@test/createMockData';

import { PrismaCleaner } from '../prismaCleaner';

const cleaner = new PrismaCleaner(prisma);

beforeEach(async () => {
  await cleaner.clean();
});

afterAll(async () => {
  await prisma.$disconnect();
});

describe('prisma-cleaner', () => {
  it('shoud create a user', async () => {
    const user = createUserMock({ name: 'Carlos', email: 'john@example.com' });
    const response = await prisma.user.create({
      data: user,
    });

    expect(response.name).toEqual('Carlos');
    expect(response.email).toEqual('john@example.com');
  });

  it('should create a user with the same email as the first test', async () => {
    const user = createUserMock({ name: 'Murilo', email: 'john@example.com' });
    const response = await prisma.user.create({
      data: user,
    });

    const users = await prisma.user.findMany();

    expect(users).toHaveLength(1);
    expect(response.name).toEqual('Murilo');
    expect(response.email).toEqual('john@example.com');
  });
});
