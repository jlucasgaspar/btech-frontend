import { User } from '../../models';

export type LoginFormData = {
  email: string;
  password: string;
}

export type LoginApiResult = {
  user: User;
  jwt: string;
}