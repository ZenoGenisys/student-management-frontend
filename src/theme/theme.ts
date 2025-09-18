import { createTheme } from "@mui/material/styles";

declare module '@mui/material/styles' {
  interface ThemeOptions {
    customShadows?: {
      card?: string;
      dialog?: string;
      dropdown?: string;
    };
  }
  interface Theme {
    customShadows: {
      card: string;
      dialog: string;
      dropdown: string;
    };
  }
}

const theme = createTheme({
  palette: {
    primary: { main: "#1B5A90", contrastText: "#fff" },
    secondary: { main: "#00B9F1" },
    success: { main: "#28A745" },
    warning: { main: "#FFC107" },
    error: { main: "#DC3545" },
    background: { default: "#F8F9FA", paper: "#fff" },
    text: { primary: "#202C4B", secondary: "#6A7287" },
  },
  typography: {
    fontFamily: "Roboto, sans-serif",
    h1: {
      fontSize: "2.5rem",
      fontWeight: 600,
      lineHeight: 1.2,
    },
    h2: {
      fontSize: "2rem",
      fontWeight: 600,
      lineHeight: 1.3,
    },
    h3: {
      fontSize: "1.75rem",
      fontWeight: 500,
      lineHeight: 1.4,
    },
    h4: {
      fontSize: "1.5rem",
      fontWeight: 500,
      lineHeight: 1.4,
    },
    h5: {
      fontSize: "1.25rem",
      fontWeight: 500,
      lineHeight: 1.4,
    },
    h6: {
      fontSize: "1rem",
      fontWeight: 500,
      lineHeight: 1.4,
    },
    body1: { 
      fontSize: "1rem",
      lineHeight: 1.5,
    },
    body2: { 
      fontSize: "0.875rem",
      lineHeight: 1.57,
      color: "#6A7287",
    },
    button: {
      textTransform: "none",
      fontWeight: 500,
    },
  },
  shape: {
    borderRadius: 8,
  },
  shadows: [
    'none',
    '0 2px 4px rgba(0,0,0,0.05)',
    '0 4px 6px rgba(0,0,0,0.07)',
    '0 6px 8px rgba(0,0,0,0.08)',
    '0 8px 12px rgba(0,0,0,0.1)',
    '0 12px 16px rgba(0,0,0,0.12)',
    '0 14px 20px rgba(0,0,0,0.14)',
    '0 16px 24px rgba(0,0,0,0.15)',
    '0 18px 28px rgba(0,0,0,0.16)',
    '0 20px 32px rgba(0,0,0,0.17)',
    '0 22px 36px rgba(0,0,0,0.18)',
    '0 24px 40px rgba(0,0,0,0.19)',
    '0 24px 40px rgba(0,0,0,0.19)',
    '0 24px 40px rgba(0,0,0,0.19)',
    '0 24px 40px rgba(0,0,0,0.19)',
    '0 24px 40px rgba(0,0,0,0.19)',
    '0 24px 40px rgba(0,0,0,0.19)',
    '0 24px 40px rgba(0,0,0,0.19)',
    '0 24px 40px rgba(0,0,0,0.19)',
    '0 24px 40px rgba(0,0,0,0.19)',
    '0 24px 40px rgba(0,0,0,0.19)',
    '0 24px 40px rgba(0,0,0,0.19)',
    '0 24px 40px rgba(0,0,0,0.19)',
    '0 24px 40px rgba(0,0,0,0.19)',
    '0 24px 40px rgba(0,0,0,0.19)'
  ],
  customShadows: {
    card: '0 4px 8px rgba(0,0,0,0.1)',
    dialog: '0 8px 16px rgba(0,0,0,0.15)',
    dropdown: '0 2px 4px rgba(0,0,0,0.08)',
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: 8,
          padding: '8px 16px',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: '0 4px 6px rgba(0,0,0,0.07)',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 8,
          },
        },
      },
    },
  },
});

export default theme;