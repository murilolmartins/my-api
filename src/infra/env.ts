import 'dotenv/config';
import { z } from 'zod';

const envSchema = z.object({
  API_PORT: z.coerce.number().default(3000),
});

const getEnv = envSchema.safeParse(process.env);

if (!getEnv.success) {
  throw new Error(getEnv.error.message);
}

export const envVars = getEnv.data;
