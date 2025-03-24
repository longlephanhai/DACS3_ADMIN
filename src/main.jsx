import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";
import App from './App';
import ErrorPage from './pages/error/error';
import LoginPage from './pages/auth/login';
import { AuthWrapper } from './components/context/auth.context';
import Home from './pages/home/home';
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <Home />
      }
    ]
  },
  {
    path: '/auth/login',
    element: <LoginPage />,
  }
]);
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthWrapper>
      <RouterProvider router={router} />
    </AuthWrapper>
  </StrictMode>,
)
