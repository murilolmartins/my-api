import type { FastifyInstance } from 'fastify';

import userRoutes from '@/modules/users/infra/routes';

const AppRoutes = async (app: FastifyInstance): Promise<void> => {
  void app.register(userRoutes, { prefix: '/user' });
};

export { AppRoutes };
