import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { useEffect, useState } from 'react';
import { SendEmailForm } from './SendEmailForm';
import { useGlobalContext } from '../../contexts/global';

export const SendForgotPasswordEmail = () => {
  const [isLoading, setLoading] = useState(false);
  const { setCurrentPage } = useGlobalContext();

  useEffect(() => {
    setLoading(true);

    const jwtExists = localStorage.getItem('bolttech::jwt');
    if (jwtExists) {
      setCurrentPage('dashboard');
    }

    setLoading(false);
  }, [setCurrentPage]);

  if (isLoading) return <></>;
  return (
    <Grid container component="main" sx={{ height: '100vh' }}>
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        sx={{
          // backgroundImage: 'url(https://source.unsplash.com/random)',
          backgroundImage: 'url(https://x2u3s3r4.stackpathcdn.com/wp-content/uploads/2021/07/Insurtech-Unicorn-Bolttech-Plots-European-Expansion-With-Its-Acquisition-of-i-surance-1440x564_c.png?x30842)',
          backgroundRepeat: 'no-repeat',
          backgroundColor: (t) => t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <Box
          sx={{
            my: 8,
            mx: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography component="h1" variant="h5">You'll receive a 6 digits code in your e-mail</Typography>

          <SendEmailForm />
        </Box>
      </Grid>
    </Grid>
  );
}