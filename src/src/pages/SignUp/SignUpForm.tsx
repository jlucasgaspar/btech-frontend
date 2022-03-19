import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';

import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { useForm } from 'react-hook-form';

import { SignUpApiResult, SignUpFormData } from './types';
import { signUpResolver } from './utils';
import { makeHttpRequest } from '../../services/api';
import { useGlobalContext } from '../../contexts/global';
import { useUserContext } from '../../contexts/user';

const resolver = signUpResolver();

export const SignUpForm = () => {
  const [isLoading, setLoading] = useState(false);
  const { handleSubmit, formState, register, setError } = useForm<SignUpFormData>({ resolver });
  const { setCurrentPage } = useGlobalContext();
  const { setUser } = useUserContext();

  const handleSignUp = handleSubmit(async ({ email, password, name, passwordConfirmation }) => {
    if (password !== passwordConfirmation) {
      setError('passwordConfirmation', { message: 'Password confirmation is different.' });
      return;
    }

    setLoading(true);

    const result = await makeHttpRequest<SignUpApiResult>('post', '/users/signup', {
      passwordConfirmation,
      password,
      email,
      name,
    });

    if (result.type === 'fail') {
      setLoading(false);
      return toast.error(result.error);
    }

    const { user, jwt } = result.data;

    localStorage.setItem('bolttech::jwt', jwt);

    setUser(user);

    setCurrentPage('dashboard');
  });

  return (
    <Box component="form" sx={{ mt: 1 }}>
      <TextField
        margin="normal"
        required
        fullWidth
        id="name"
        label="Name"
        autoComplete="name"
        autoFocus
        error={Boolean(formState.errors.name)}
        helperText={formState.errors.name?.message}
        disabled={isLoading}
        {...register('name')}
      />
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
      <TextField
        margin="normal"
        required
        fullWidth
        label="Password"
        type="password"
        id="password"
        autoComplete="current-password"
        error={Boolean(formState.errors.password)}
        helperText={formState.errors.password?.message}
        disabled={isLoading}
        {...register('password')}
      />
      <TextField
        margin="normal"
        required
        fullWidth
        label="Password confirmation"
        type="password"
        id="passwordConfirmation"
        autoComplete="current-passwordConfirmation"
        error={Boolean(formState.errors.passwordConfirmation)}
        helperText={formState.errors.passwordConfirmation?.message}
        disabled={isLoading}
        {...register('passwordConfirmation')}
      />
      <Button
        type="submit"
        fullWidth
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
        onClick={handleSignUp}
        disabled={isLoading}
      >
        Sign up
      </Button>
      <Grid container justifyContent="center">
        <Grid item>
          <Link href="#" variant="body2" onClick={e => {
            e.preventDefault();
            setCurrentPage('login');
          }}>
            Don't have an account? Login
          </Link>
        </Grid>
      </Grid>
    </Box>
  );
}