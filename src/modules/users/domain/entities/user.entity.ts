import { randomUUID } from 'node:crypto';

import type { CreateUserType } from '../schemas/create-user.schema';

export class UserEntity {
  id: string = randomUUID();

  constructor(userData: CreateUserType) {}
}
