import { buildApp } from '../app';
import prisma from '../prisma';

describe('App', () => {
  it('should request healthcheck route', async () => {
    const app = await buildApp(prisma);

    const response = await app.inject({
      method: 'GET',
      url: '/healthcheck',
    });

    expect(response.statusCode).toBe(200);

    await app.close();
  });
});
