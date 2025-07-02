
import { Request } from 'express';

declare module 'express' {
  interface UserPayload {
    userId: string;
    role: string;
  }

  interface Request {
    user?: UserPayload;
  }
}
