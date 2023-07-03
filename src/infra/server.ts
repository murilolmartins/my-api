import { app } from './app';
import { envVars } from './env';
import prisma from './prisma';

app.decorate('prisma', prisma);

async function start(): Promise<void> {
  app.listen({ port: envVars.API_PORT, host: '0.0.0.0' }, (err, address) => {
    if (!err) {
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
