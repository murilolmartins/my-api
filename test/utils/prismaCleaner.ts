import { envVars } from '@/infra/env';
import { type PrismaClient } from '@prisma/client';

export class PrismaCleaner {
  constructor(private readonly prisma: PrismaClient) {
    this.prisma = prisma;
  }

  async clean(): Promise<any> {
    if (envVars.NODE_ENV !== 'test') {
      throw new Error('You can only clean the database in test environment');
    }

    const tablenames = await this.prisma.$queryRaw<
      Array<{ tablename: string }>
    >`SELECT tablename FROM pg_tables WHERE schemaname='public'`;

    const tables = tablenames
      .map(({ tablename }) => tablename)
      .filter((name) => name !== '_prisma_migrations')
      .map((name) => `"public"."${name}"`)
      .join(', ');

    try {
      await this.prisma.$executeRawUnsafe(`TRUNCATE TABLE ${tables} CASCADE;`);
    } catch (error) {
      console.log({ error });
    }
  }
}
