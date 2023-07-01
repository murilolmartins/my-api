import type { FastifyInstance } from 'fastify';

import userRoutes from './user';

const AppRoutes = async (app: FastifyInstance) => {
  app.register(userRoutes, { prefix: '/user' });
};

export { AppRoutes };
