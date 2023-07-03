import { hash } from 'bcryptjs';
import dayjs from 'dayjs';

import { BaseEntity } from '@/core';

import { type CreateUserType } from '../schemas';

export class UserEntity extends BaseEntity {
  name: string;
  email: string;
  age: number;
  password: string;
  birthdate: Date;

  constructor(userData: CreateUserType) {
    super();
    this.name = userData.name;
    this.email = userData.email;
    this.password = userData.password;
    this.birthdate = userData.birthdate;
    this.age = this.calculateAge(userData.birthdate);
  }

  public calculateAge(birthdate: Date): number {
    const parseDate = dayjs(birthdate);

    const now = dayjs(new Date());

    return now.diff(parseDate, 'year');
  }

  public async encryptPassword(): Promise<void> {
    this.password = await hash(this.password, 8);
  }
}
