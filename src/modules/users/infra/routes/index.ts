import type { FastifyInstance, FastifyPluginAsync } from 'fastify';

import { createUserRoute } from './createUser.route';

const userRoutes: FastifyPluginAsync = async (app: FastifyInstance) => {
  createUserRoute(app);
};

export default userRoutes;
