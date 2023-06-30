import type { FastifyReply, FastifyRequest } from 'fastify';
import fastify from 'fastify';

const app = fastify();

app.get('/', async (request: FastifyRequest, reply: FastifyReply) => {
  return reply.send({ hello: 'world' });
});

export { app };
