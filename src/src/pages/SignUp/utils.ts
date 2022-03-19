import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { SignUpFormData } from './types';

export const signUpResolver = () => {
  const resolver: Yup.SchemaOf<SignUpFormData> = Yup.object({
    name: Yup.string().required('Name is required'),
    email: Yup.string().email('Invalid e-mail').required('E-mail is required'),
    password: Yup.string().required('Password is required'),
    passwordConfirmation: Yup.string().required('Password confirmation is required')
  });

  return yupResolver(resolver);
}