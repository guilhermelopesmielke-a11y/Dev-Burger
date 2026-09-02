import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import GlobalStyle from './styles/globalStyles'
import { ToastContainer } from 'react-toastify';
import { RouterProvider } from 'react-router-dom'
import { router } from './routes'
import AppProvider from './hooks/index';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AppProvider>
      <GlobalStyle />                    {/* CSS global: reset + fontes */}
      <RouterProvider router={router} /> {/* Troca a página conforme a URL */}
      <ToastContainer autoClose={3000} theme='colored' /> {/* Onde os avisos (toasts) aparecem */}
    </AppProvider>
  </StrictMode>,
)
