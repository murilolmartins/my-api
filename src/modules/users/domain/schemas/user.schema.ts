import { z } from 'zod';

const userSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string().min(8, 'Password must be at least 8 characters long'),
  birthDate: z.date(),
  age: z.number(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type UserType = z.infer<typeof userSchema>;
