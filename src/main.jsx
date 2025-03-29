import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import App from './App';
import ErrorPage from './pages/error/error';
import LoginPage from './pages/auth/login';
import { AuthWrapper } from './components/context/auth.context';
import Home from './pages/home/home';
import PrivateRoute from './components/private/privateRoute';
import ProductPage from './pages/product/product';
import CategoryPage from './pages/category/category.jsx';
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: (
          <PrivateRoute>
            <Home />
          </PrivateRoute>
        )
      },
      {
        path: 'product',
        element: (
          <PrivateRoute>
            <ProductPage />
          </PrivateRoute>
        )
      },
      {
        path: "category",
        element: (
          <PrivateRoute>
            <CategoryPage />
          </PrivateRoute>
        )
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
