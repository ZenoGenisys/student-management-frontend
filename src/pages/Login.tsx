import React, { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../state';
import { PATH } from '../routes/path';
import { Box, Typography, TextField, Button, Paper } from '@mui/material';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      // Do API call and Place the response based on that
      // In a real app, you would make an API call here
      const fakeToken = btoa(`${username}:${password}`);
      login(username, fakeToken);
      navigate(PATH.DASHBOARD, { replace: true });
    },
    [navigate, login, username, password],
  );

  return (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
      <Paper elevation={3} sx={{ p: 4, maxWidth: 400, width: '100%' }}>
        <Typography variant="h5" component="h2" gutterBottom align="center">
          Login
        </Typography>
        <Box component="form" onSubmit={handleLogin} display="flex" flexDirection="column" gap={2}>
          <TextField
            label="Username"
            variant="outlined"
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
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
