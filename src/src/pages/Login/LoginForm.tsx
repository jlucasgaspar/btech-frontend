import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import { useForm } from 'react-hook-form';
import { LoginApiResult, LoginFormData } from './types';
import { loginResolver } from './utils';
import { makeHttpRequest } from '../../services/api';
// import { httpHandler } from '../../utils/httpErrorHandler';

const resolver = loginResolver();

export const LoginForm = () => {
  const { handleSubmit, formState, register } = useForm<LoginFormData>({ resolver });

  const handleLogin = handleSubmit(async ({ email, password }) => {
    const result = await makeHttpRequest<LoginApiResult>('post', '/users/login', { email, password });

    if (result.type === 'fail') {
      console.log(result);
      return;
    }

    const a = result;

    console.log('aaaa ::', a)

    // const { } = await httpHandler(api.post('/users/login', { email, password }));
    // const result = await api.post<LoginApiResult>('/users/login', { email, password });
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
        {...register('password')}
      />
      {/* <FormControlLabel
        control={<Checkbox value="remember" color="primary" />}
        label="Remember me"
      /> */}
      <Button
        type="submit"
        fullWidth
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
        onClick={handleLogin}
      >
        Sign In
      </Button>
      {/* <Grid container>
        <Grid item xs>
          <Link href="#" variant="body2">
            Forgot password?
          </Link>
        </Grid>
        <Grid item>
          <Link href="#" variant="body2">
            {"Don't have an account? Sign Up"}
          </Link>
        </Grid>
      </Grid> */}
    </Box>
  );
}