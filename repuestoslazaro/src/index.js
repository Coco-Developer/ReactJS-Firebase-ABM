import React from 'react';
import { createRoot } from 'react-dom/client'; 
import App from './App';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import './index.css';

const theme = createTheme({
  palette: {
    primary: {
      main: '#424242', 
    },
    secondary: {
      main: '#FF9800', 
    },
  },
  typography: {
    fontFamily: 'Roboto, sans-serif',
  },
});


createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </React.StrictMode>
);
