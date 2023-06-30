import { app } from './app';
import { envVars } from './env';

async function start() {
  app.listen({ port: envVars.API_PORT, host: '0.0.0.0' }, (err, address) => {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    console.log(`Server listening at ${address}`);
  });
}

start();
