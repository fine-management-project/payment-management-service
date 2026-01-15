import { Request } from 'express';
import { Role } from './role';

interface AuthUser {
  email?: string;
  azp?: string;
  gty?: string;
  ['user/id']?: string;
  ['user/roles']?: Role[];
}
declare module 'express' {
  interface Request {
    user?: AuthUser;
  }
}
