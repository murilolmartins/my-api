import { randomUUID } from 'node:crypto';

export class BaseEntity {
  id: string = randomUUID();
  createdAt: Date = new Date();
  updatedAt: Date = new Date();
}
