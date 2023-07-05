import { buildApp } from './app';
import { envVars } from './env';
import prisma from './prisma';

async function start(): Promise<void> {
  const app = await buildApp(prisma);
  app.listen({ port: envVars.API_PORT, host: '0.0.0.0' }, (err, address) => {
    if (err) {
      app.log.error(err);
      process.exit(1);
    }
  });
}

start()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    await prisma.$disconnect();
    process.exit(1);
  });
