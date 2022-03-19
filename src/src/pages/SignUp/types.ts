import { User } from '../../models';


export type SignUpFormData = {
  name: string;
  email: string;
  password: string;
  passwordConfirmation: string;
}

export type SignUpApiResult = {
  user: User;
  jwt: string;
}