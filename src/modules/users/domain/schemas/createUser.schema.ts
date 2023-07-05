import { z } from 'zod';

export const createUserSchema = z.object({
  name: z.string({
    invalid_type_error: 'Name must be a string',
    required_error: 'Name is required',
  }),
  email: z
    .string({
      invalid_type_error: 'Email must be a string',
      required_error: 'Email is required',
    })
    .email(),
  password: z
    .string({
      invalid_type_error: 'Password must be a string',
      required_error: 'Password is required',
    })
    .min(8, 'Password must be at least 8 characters long'),
  birthdate: z.string().transform((str) => new Date(str)),
});

export type CreateUserType = z.infer<typeof createUserSchema>;
