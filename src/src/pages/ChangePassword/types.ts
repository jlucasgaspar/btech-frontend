import { User } from '../../models';

export type ChangePasswordFormData = {
  email: string;
  password: string;
  passwordConfirmation: string;
  forgotPasswordCode: string;
}

export type ChangePasswordApiResult = {
  user: User;
  jwt: string;
}