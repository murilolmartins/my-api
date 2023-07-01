import { z } from 'zod';

export const createUserSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string().min(8, 'Password must be at least 8 characters long'),
  birthDate: z.date(),
});

export const CreateUserResponseSchema = z.object({
  message: z.string().default('User created'),
  user: z.object({
    id: z.string(),
    name: z.string(),
    email: z.string().email(),
    birthDate: z.date(),
  }),
});

export type CreateUserType = z.infer<typeof createUserSchema>;

export type CreateUserResponseType = z.infer<typeof CreateUserResponseSchema>;
