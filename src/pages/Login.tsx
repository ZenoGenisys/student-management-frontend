import React, { useCallback, useState, useEffect } from 'react';
import { useAuth, useLoading, useSnackbar } from '../state';
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  CircularProgress,
  IconButton,
  InputAdornment,
} from '@mui/material';
import { ShaderAnimation } from '../components/animations/ShaderAnimation';
import { styled } from '@mui/material/styles';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { loginService } from '../repositories';

// Styled components for animations
const AnimatedContainer = styled(Box)``;

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
  const { login } = useAuth();
  const { showSnackbar } = useSnackbar();
  const { loading, setLoading } = useLoading();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showElements, setShowElements] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showShaderAnimation, setShowShaderAnimation] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768); // Common breakpoint for tablets
    };
    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);
    return () => window.removeEventListener('resize', checkIsMobile);
  }, []);

  // Trigger animations on component mount
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowElements(true);
    }, 50);
    return () => clearTimeout(timer);
  }, []);

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      setLoading(true);

      try {
        // First validate credentials
        const response = await loginService(email, password);

        // Show success message and start animation BEFORE updating auth state
        showSnackbar({
          message: 'Login successful!',
          severity: 'success',
        });

        setLoading(false);

        // 1. Start fade out of login page (0.6s)
        setShowElements(false);
        await new Promise((resolve) => setTimeout(resolve, 600));

        if (!isMobile) {
          // 2. Start shader animation after login form has faded out
          setShowShaderAnimation(true);

          // 3. Wait for shader animation to complete (3s)
          await new Promise((resolve) => setTimeout(resolve, 3000));
        }

        // 4. Complete the login process
        login(response);
      } catch (e: unknown) {
        setLoading(false);
        setShowShaderAnimation(false);
        showSnackbar({
          message: (e as Error).message || 'Login failed. Please check your credentials.',
          severity: 'error',
        });
      }
    },
    [login, showSnackbar, email, password, isMobile, setLoading],
  );

  return (
    <>
      {/* Shader Animation Container */}
      {!isMobile && (
        <div className={`shader-container ${showShaderAnimation ? 'visible' : ''}`}>
          <ShaderAnimation isVisible={showShaderAnimation} />
          <div
            className="transition-message"
            style={{
              opacity: showShaderAnimation ? 1 : 0,
              transition: 'opacity 0.5s ease-in-out',
              transitionDelay: '0.3s',
            }}
          >
            Welcome to Dashboard
          </div>
        </div>
      )}

      {/* Main Content */}
      <AnimatedContainer
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
        sx={{
          position: 'relative',
          opacity: showShaderAnimation ? 0 : 1,
          transition: 'opacity 0.6s ease-out',
        }}
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
                mb: 3,
              }}
            >
              Welcome Back
            </Typography>
          </AnimatedFormElement>

          <Box
            component="form"
            onSubmit={handleLogin}
            display="flex"
            flexDirection="column"
            gap={3}
          >
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
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <AnimatedButton
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                  disabled={loading}
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
                  {loading ? <CircularProgress size={24} color="inherit" /> : 'Sign In'}
                </AnimatedButton>
              </Box>
            </AnimatedFormElement>
          </Box>
        </AnimatedPaper>
      </AnimatedContainer>
    </>
  );
};

export default Login;
