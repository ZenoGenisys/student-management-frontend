import { createTheme } from "@mui/material/styles";

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
    h1: { fontSize: "2rem", fontWeight: 600 },
    h2: { fontSize: "1.5rem", fontWeight: 600 },
    h3: { fontSize: "1.25rem", fontWeight: 500 },
    body1: { fontSize: "1rem" },
    body2: { fontSize: "0.875rem", color: "#6A7287" },
  },
  shape: {
    borderRadius: 8,
  },
  shadows: [
    "none",
    "0 2px 4px rgba(0,0,0,0.1)",
    "none",
    "none",
    "none",
    "none",
    "none",
    "none",
    "none",
    "none",
    "none",
    "none",
    "none",
    "none",
    "none",
    "none",
    "none",
    "none",
    "none",
    "none",
    "none",
    "none",
    "none",
    "none",
    "none"
  ],
});

export default theme;