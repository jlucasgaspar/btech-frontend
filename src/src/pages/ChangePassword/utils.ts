import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { ChangePasswordFormData } from './types';

export const changePasswordResolver = () => {
  const resolver: Yup.SchemaOf<ChangePasswordFormData> = Yup.object({
    email: Yup.string().email('Invalid e-mail').required('E-mail is required'),
    password: Yup.string().required('Password is required'),
    passwordConfirmation: Yup.string().required('Password confirmation is required'),
    forgotPasswordCode: Yup.string().required('Code is required').length(6)
  });

  return yupResolver(resolver);
}