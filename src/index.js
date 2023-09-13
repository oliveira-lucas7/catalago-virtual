import React from 'react';
import ReactDOM from 'react-dom/client';
import App from "./App";
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Login from './Login';
import Cadastro from './Cadastro';
import Movie from './Movie';
import EditaFilme from './EditaFilme';
import { createTheme, ThemeOptions, ThemeProvider } from '@mui/material/styles';

const theme = createTheme( {
  palette: {
    mode: 'light',
    primary: {
      main: '#D62413',
    },
    secondary: {
      main: '#346187',
      light: '#7f1365',
    },
    background: {
      default: '#ffff',
      paper: '#0cd66f',
    },
    error: {
      main: '#d32f2f',
    },
    success: {
      main: '#2e7d32',
    },
  },
})

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />
  },
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/cadastro",
    element: <Cadastro />
  },
  {
    path: "/movie",
    element: <Movie />
  },
  {
    path: "/edicao/:id",
    element: <EditaFilme/>
  }
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ThemeProvider theme={theme}>
    <RouterProvider router={router}/>
  </ThemeProvider>
)