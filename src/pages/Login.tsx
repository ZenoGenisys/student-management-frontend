import React, { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth, useSnackbar } from '../state';
import { PATH } from '../routes/path';
import { Box, Typography, TextField, Button, Paper } from '@mui/material';
import { loginService } from '../repositories';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const { showSnackbar } = useSnackbar();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = useCallback(
    async (e: React.FormEvent) => {
      try {
        e.preventDefault();
        const response = await loginService(email, password);
        login(response);
        showSnackbar({
          message: 'Login successful!',
          severity: 'success',
        });
        navigate(PATH.DASHBOARD, { replace: true });
      } catch (e: unknown) {
        showSnackbar({
          message: (e as Error).message || 'Login failed. Please check your credentials.',
          severity: 'error',
        });
      }
    },
    [navigate, login, showSnackbar, email, password],
  );

  return (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
      <Paper elevation={3} sx={{ p: 4, maxWidth: 400, width: '100%' }}>
        <Typography variant="h5" component="h2" gutterBottom align="center">
          Login
        </Typography>
        <Box component="form" onSubmit={handleLogin} display="flex" flexDirection="column" gap={2}>
          <TextField
            label="Email"
            variant="outlined"
            required
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoFocus
            fullWidth
          />
          <TextField
            label="Password"
            variant="outlined"
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
          />
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Login
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default Login;
