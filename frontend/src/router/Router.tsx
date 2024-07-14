import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from 'react-router-dom';

import { ThemesTester } from '../components/ui/themes-tester';
import { registerUserAction } from './actions/auth';
import { LayoutAuth, LoginPage, RegisterPage } from './views/auth';

export const Router = () => {
  /**
   * Router de las diferentes rutas que son parte de la web
   * TODO: Agregar loaders para la protección de rutas privadas
   */
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
          action: registerUserAction(),
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
