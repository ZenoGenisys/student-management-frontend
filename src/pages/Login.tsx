import React, { useCallback, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth, useSnackbar } from '../state';
import { PATH } from '../routes/path';
import { Box, Typography, TextField, Button, Paper, CircularProgress, IconButton, InputAdornment } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { loginService } from '../repositories';

// Styled components for animations
const AnimatedContainer = styled(Box)`
`;

const AnimatedPaper = styled(Paper)`
  backdrop-filter: blur(10px);
  background: rgba(255, 255, 255, 0.95);
  border-radius: 16px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
`;

const AnimatedFormElement = styled(Box)`
  transition: all 0.3s ease-out;
`;

const AnimatedButton = styled(Button)`
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  border-radius: 12px;
  text-transform: none;
  font-weight: 600;
  letter-spacing: 0.5px;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(25, 118, 210, 0.3);
  }
  
  &:active {
    transform: translateY(0);
  }
`;

const Login: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const { showSnackbar } = useSnackbar();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showElements, setShowElements] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Trigger animations on component mount
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowElements(true);
      console.log('Animations triggered!');
    }, 50);
    return () => clearTimeout(timer);
  }, []);

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = useCallback(
    async (e: React.FormEvent) => {
      try {
        e.preventDefault();
        setIsLoading(true);
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
      } finally {
        setIsLoading(false);
      }
    },
    [navigate, login, showSnackbar, email, password],
  );

  return (
    <AnimatedContainer 
      display="flex" 
      justifyContent="center" 
      alignItems="center" 
      minHeight="100vh"
    >
      <AnimatedPaper 
        elevation={0} 
        sx={{ p: 4, maxWidth: 400, width: '100%' }}
        style={{
          opacity: showElements ? 1 : 0,
          transform: showElements ? 'translateY(0)' : 'translateY(30px)',
          transition: 'all 0.3s ease-out',
          transitionDelay: '0.2s',
        }}
      >
        <AnimatedFormElement
          style={{
            opacity: showElements ? 1 : 0,
            transform: showElements ? 'translateY(0)' : 'translateY(30px)',
            transition: 'all 0.3s ease-out',
            transitionDelay: '0.3s',
          }}
        >
          <Typography 
            variant="h4" 
            component="h1" 
            gutterBottom 
            align="center"
            sx={{ 
              fontWeight: 700,
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              mb: 3
            }}
          >
            Welcome Back
          </Typography>
        </AnimatedFormElement>
        
        <Box component="form" onSubmit={handleLogin} display="flex" flexDirection="column" gap={3}>
          <AnimatedFormElement
            style={{
              opacity: showElements ? 1 : 0,
              transform: showElements ? 'translateY(0)' : 'translateY(30px)',
              transition: 'all 0.3s ease-out',
              transitionDelay: '0.5s',
            }}
          >
            <TextField
              label="Email"
              variant="outlined"
              required
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoFocus
              fullWidth
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: '12px',
                  '&:hover fieldset': {
                    borderColor: '#667eea',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#667eea',
                  },
                },
              }}
            />
          </AnimatedFormElement>
          
          <AnimatedFormElement
            style={{
              opacity: showElements ? 1 : 0,
              transform: showElements ? 'translateY(0)' : 'translateY(30px)',
              transition: 'all 0.3s ease-out',
              transitionDelay: '0.7s',
            }}
          >
            <TextField
              label="Password"
              variant="outlined"
              type={showPassword ? 'text' : 'password'}
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              fullWidth
              slotProps={{
                input: {
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleTogglePasswordVisibility}
                        edge="end"
                        sx={{
                          color: '#667eea',
                          transition: 'all 0.2s ease-in-out',
                          '&:hover': {
                            backgroundColor: 'rgba(102, 126, 234, 0.1)',
                            transform: 'scale(1.1)',
                          },
                        }}
                      >
                        {showPassword ? (
                          <VisibilityOff 
                            sx={{ 
                              fontSize: '1.2rem',
                              transition: 'all 0.2s ease-in-out',
                            }} 
                          />
                        ) : (
                          <Visibility 
                            sx={{ 
                              fontSize: '1.2rem',
                              transition: 'all 0.2s ease-in-out',
                            }} 
                          />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                },
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: '12px',
                  '&:hover fieldset': {
                    borderColor: '#667eea',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#667eea',
                  },
                },
              }}
            />
          </AnimatedFormElement>
          
          <AnimatedFormElement
            style={{
              opacity: showElements ? 1 : 0,
              transform: showElements ? 'translateY(0)' : 'translateY(30px)',
              transition: 'all 0.3s ease-out',
              transitionDelay: '0.9s',
            }}
          >
            <AnimatedButton 
              type="submit" 
              variant="contained" 
              color="primary" 
              fullWidth
              disabled={isLoading}
              sx={{
                py: 1.5,
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                '&:hover': {
                  background: 'linear-gradient(135deg, #5a6fd8 0%, #6a4190 100%)',
                },
                '&:disabled': {
                  background: 'rgba(0, 0, 0, 0.12)',
                },
              }}
            >
              {isLoading ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                'Sign In'
              )}
            </AnimatedButton>
          </AnimatedFormElement>
        </Box>
      </AnimatedPaper>
    </AnimatedContainer>
  );
};

export default Login;
