import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { LoginFormData } from './types';

export const loginResolver = () => {
  const resolver: Yup.SchemaOf<LoginFormData> = Yup.object({
    email: Yup.string().email('Invalid e-mail').required('E-mail is required'),
    password: Yup.string().required('Password is required')
  });

  return yupResolver(resolver);
}