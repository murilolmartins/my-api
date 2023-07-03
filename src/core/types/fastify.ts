interface Error {
  code: string;
  message: string;
}

export interface FastifyResponse<T> {
  statusCode: number;
  data: T | null;
  errors: Error[] | null;
}
