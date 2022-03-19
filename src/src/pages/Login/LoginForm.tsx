import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';

import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { useForm } from 'react-hook-form';

import { LoginApiResult, LoginFormData } from './types';
import { loginResolver } from './utils';

import { makeHttpRequest } from '../../services/api';
import { useGlobalContext } from '../../contexts/global';
import { useUserContext } from '../../contexts/user';

const resolver = loginResolver();

export const LoginForm = () => {
  const [isLoading, setLoading] = useState(false);
  const { handleSubmit, formState, register } = useForm<LoginFormData>({ resolver });
  const { setCurrentPage } = useGlobalContext();
  const { setUser } = useUserContext();

  const handleLogin = handleSubmit(async ({ email, password }) => {
    setLoading(true);

    const result = await makeHttpRequest<LoginApiResult>('post', '/users/login', { email, password });

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
      <Button
        type="submit"
        fullWidth
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
        onClick={handleLogin}
        disabled={isLoading}
      >
        Login
      </Button>
      <Grid container justifyContent="center">
        <Grid item>
          <Link href="#" variant="body2" onClick={e => {
            e.preventDefault();
            setCurrentPage('signup');
          }}>
            Don't have an account? Sign Up
          </Link>
        </Grid>
      </Grid>
    </Box>
  );
}