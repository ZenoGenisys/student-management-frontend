import type { Theme } from '@mui/material/styles';
import { createTheme, responsiveFontSizes } from '@mui/material/styles';

declare module '@mui/material/styles' {
  interface Theme {
    customSpacing: {
      page: {
        xs: number;
        sm: number;
        md: number;
      };
      section: {
        xs: number;
        sm: number;
        md: number;
      };
    };
    customTransitions: {
      durations: {
        shortest: number;
        shorter: number;
        short: number;
        standard: number;
        complex: number;
        enteringScreen: number;
        leavingScreen: number;
      };
      easings: {
        easeInOut: string;
        easeOut: string;
        easeIn: string;
        sharp: string;
      };
    };
  }
  interface ThemeOptions {
    customSpacing?: {
      page?: {
        xs: number;
        sm: number;
        md: number;
      };
      section?: {
        xs: number;
        sm: number;
        md: number;
      };
    };
    customTransitions?: {
      durations?: {
        shortest: number;
        shorter: number;
        short: number;
        standard: number;
        complex: number;
        enteringScreen: number;
        leavingScreen: number;
      };
      easings?: {
        easeInOut: string;
        easeOut: string;
        easeIn: string;
        sharp: string;
      };
    };
  }
}

const customTransitions = {
  durations: {
    shortest: 150,
    shorter: 200,
    short: 250,
    standard: 300,
    complex: 375,
    enteringScreen: 225,
    leavingScreen: 195,
  },
  easings: {
    easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
    easeOut: 'cubic-bezier(0.0, 0, 0.2, 1)',
    easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
    sharp: 'cubic-bezier(0.4, 0, 0.6, 1)',
  },
};

const customSpacing = {
  page: {
    xs: 16,
    sm: 24,
    md: 32,
  },
  section: {
    xs: 24,
    sm: 32,
    md: 48,
  },
};

// Generate shadows array with exact 25 elements as required by MUI
const shadows = [
  'none',
  '0 2px 4px rgba(0, 0, 0, 0.08)',
  '0 4px 8px rgba(0, 0, 0, 0.12)',
  '0 8px 16px rgba(0, 0, 0, 0.16)',
  '0 12px 24px rgba(0, 0, 0, 0.2)',
  '0 16px 32px rgba(0, 0, 0, 0.24)',
  ...Array(19).fill('none'),
] as Theme['shadows'];

const baseTheme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },
  palette: {
    primary: { main: '#506EE4', contrastText: '#fff', light: '#506EE41A' },
    secondary: { main: '#515B73', contrastText: '#fff', light: '#515B731A' },
    success: { main: '#28A745', light: '#28A7451A', contrastText: '#fff' },
    warning: { main: '#FFC107', light: '#FFC1071A', contrastText: '#fff' },
    error: { main: '#DC3545', contrastText: '#fff', light: '#DC35451A' },
    background: {
      default: '#f7f7ffff',
      paper: '#fff',
    },
    text: {
      primary: '#202C4B',
      secondary: '#6A7287',
    },
    divider: '#E3E8EE',
  },
  typography: {
    fontFamily: 'Roboto, sans-serif',
    h1: {
      fontSize: '2.5rem',
      fontWeight: 600,
      lineHeight: 1.2,
      '@media (max-width:600px)': {
        fontSize: '2rem',
      },
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 600,
      lineHeight: 1.3,
      '@media (max-width:600px)': {
        fontSize: '1.5rem',
      },
    },
    h3: {
      fontSize: '1.5rem',
      fontWeight: 600,
      lineHeight: 1.4,
      '@media (max-width:600px)': {
        fontSize: '1.25rem',
      },
    },
    h4: {
      fontSize: '1.25rem',
      fontWeight: 600,
      lineHeight: 1.4,
    },
    h5: {
      fontSize: '1.125rem',
      fontWeight: 600,
      lineHeight: 1.5,
    },
    h6: {
      fontSize: '1rem',
      fontWeight: 600,
      lineHeight: 1.6,
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.5,
    },
    body2: {
      fontSize: '0.875rem',
      lineHeight: 1.57,
      color: '#6A7287',
    },
    button: {
      textTransform: 'none',
      fontWeight: 500,
    },
    caption: {
      fontSize: '0.75rem',
      lineHeight: 1.5,
      color: '#6A7287',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          padding: '8px 16px',
          transition: 'all 0.2s ease-in-out',
          '&:hover': {
            transform: 'translateY(-1px)',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
          },
        },
        contained: {
          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.08)',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          border: '1px solid #E3E8EE',
          borderRadius: 6,
          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.08)',
          transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
          '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: '0 8px 16px rgba(0, 0, 0, 0.12)',
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.08)',
          backdropFilter: 'blur(8px)',
          backgroundColor: 'rgba(255, 255, 255, 0.95)',
          color: '#506EE4', // Using the primary text color
          '& .MuiIconButton-root': {
            color: '#202C4B',
            '&:hover': {
              backgroundColor: 'rgba(0, 0, 0, 0.04)',
            },
          },
          '& .MuiTypography-root': {
            color: '#202C4B',
          },
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          boxShadow: '2px 0 8px rgba(0, 0, 0, 0.08)',
          backgroundColor: '#fff',
        },
      },
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          margin: '4px 8px',
          transition: 'all 0.2s ease-in-out',
          '&:hover': {
            backgroundColor: 'rgba(0, 0, 0, 0.04)',
            transform: 'translateX(4px)',
          },
          '&.Mui-selected': {
            backgroundColor: 'rgba(27, 90, 144, 0.08)',
            '&:hover': {
              backgroundColor: 'rgba(27, 90, 144, 0.12)',
            },
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 8,
            transition: 'all 0.2s ease-in-out',
            '&:hover': {
              boxShadow: '0 2px 4px rgba(0, 0, 0, 0.08)',
            },
            '&.Mui-focused': {
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.12)',
            },
          },
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          fontSize: '1rem',
          minHeight: 48,
        },
      },
    },
  },
  shape: {
    borderRadius: 8,
  },
  shadows,
  customTransitions,
  customSpacing,
});

// Apply responsive font sizes
const theme = responsiveFontSizes(baseTheme);

export default theme;
