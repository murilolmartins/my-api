import { z } from 'zod';

const createUserSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string().min(6),
  birthDate: z.string().min(10).max(10),
});

export type CreateUserType = z.infer<typeof createUserSchema>;
