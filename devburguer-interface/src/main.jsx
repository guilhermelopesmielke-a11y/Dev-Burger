import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import GlobalStyle from './styles/globalStyles'
import { ToastContainer } from 'react-toastify';
import { Router } from './routes'
import AppProvider from './hooks/index';
import { ThemeProvider } from 'styled-components';
import { standardTheme } from './styles/themes/standard';
import { BrowserRouter } from 'react-router-dom';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider theme={standardTheme}>
      <AppProvider>
        <BrowserRouter>
          <Router/>
        </BrowserRouter>
        <GlobalStyle />                    {/* CSS global: reset + fontes */}
        <ToastContainer autoClose={3000} theme='colored' /> {/* Onde os avisos (toasts) aparecem */}
      </AppProvider>
    </ThemeProvider>
  </StrictMode>,
)
