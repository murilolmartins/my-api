import { type PrismaClient } from '@prisma/client';

declare module 'fastify' {
  interface FastifyRequest {
    prisma: PrismaClient;
  }
}
