import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { SendEmailFormData } from './types';

export const sendEmailResolver = () => {
  const resolver: Yup.SchemaOf<SendEmailFormData> = Yup.object({
    email: Yup.string().email('Invalid e-mail').required('E-mail is required')
  });

  return yupResolver(resolver);
}