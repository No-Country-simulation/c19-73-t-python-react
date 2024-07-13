import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from 'react-router-dom';

import { ThemesTester } from '../components/ui/themes-tester';
import { LayoutAuth, LoginPage, RegisterPage } from './views/auth';

export const Router = () => {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <ThemesTester />,
    },
    {
      path: 'auth',
      element: <LayoutAuth />,
      children: [
        {
          index: true,
          element: <LoginPage />,
        },
        {
          path: 'register',
          element: <RegisterPage />,
        },
      ],
    },
    {
      path: '*',
      element: <Navigate to={'/'} />,
    },
  ]);

  return <RouterProvider router={router} />;
};
