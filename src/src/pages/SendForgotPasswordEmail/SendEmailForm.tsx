import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';

import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { useForm } from 'react-hook-form';

import { SendEmailFormData } from './types';
import { sendEmailResolver } from './utils';

import { makeHttpRequest } from '../../services/api';
import { useGlobalContext } from '../../contexts/global';

const resolver = sendEmailResolver();

export const SendEmailForm = () => {
  const [isLoading, setLoading] = useState(false);
  const { handleSubmit, formState, register } = useForm<SendEmailFormData>({ resolver });
  const { setCurrentPage } = useGlobalContext();

  const handleSendEmail = handleSubmit(async ({ email }) => {
    setLoading(true);

    const result = await makeHttpRequest<boolean>('post', '/users/forgot-password', { email });

    if (result.type === 'fail') {
      setLoading(false);
      return toast.error(result.error);
    }

    toast.success('Please, check your e-mail now.');

    setLoading(false);

    setCurrentPage('changePassword');
  });

  return (
    <Box component="form" sx={{ mt: 1 }}>
      <TextField
        margin="normal"
        required
        fullWidth
        id="email"
        label="Email Address"
        autoComplete="email"
        autoFocus
        error={Boolean(formState.errors.email)}
        helperText={formState.errors.email?.message}
        disabled={isLoading}
        {...register('email')}
      />
      <Button
        type="submit"
        fullWidth
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
        onClick={handleSendEmail}
        disabled={isLoading}
      >
        Send e-mail
      </Button>
      <Grid container justifyContent="center">
        <Grid item>
          <Link href="#" variant="body2" onClick={e => {
            e.preventDefault();
            setCurrentPage('changePassword');
          }}>
            Already have a code? Click here
          </Link>
        </Grid>
      </Grid>
      <Grid container justifyContent="center">
        <Grid item>
          <Link href="#" variant="body2" onClick={e => {
            e.preventDefault();
            setCurrentPage('login');
          }}>
            Go back to login
          </Link>
        </Grid>
      </Grid>
    </Box>
  );
}