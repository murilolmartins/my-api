import { BaseEntity } from '@/core';

import type { CreateUserType } from '../schemas/create-user.schema';

export class UserEntity extends BaseEntity {
  name: string;
  email: string;
  password: string;
  birthDate: Date;

  constructor(userData: CreateUserType) {
    super();
    this.name = userData.name;
    this.email = userData.email;
    this.password = userData.password;
    this.birthDate = userData.birthDate;
  }
}
