import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from 'react-router-dom';

import { ThemesTester } from '../components/ui/themes-tester';
import { registerUserAction } from './actions/auth';
import { editUserAction } from './actions/main';
import { LayoutAuth, LoginPage, RegisterPage } from './views/auth';
import { EditProfilePage, LayoutMain, MyProfilePage } from './views/main';
import Dashboard from './views/main/dashboard-admin';
import InicioPage from './views/main/inicio';
import CategoryManage from './views/manage/category-manage';
import ProductsManage from './views/manage/products-manage';
import StoreManage from './views/manage/store-manage';
import Users_Manage from './views/manage/users-manage';
import PedidosPage from './views/orders/view-orders';
import PedidoDetallePage from './views/orders/view-product-orders';

export const Router = () => {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <LayoutMain />,
      children: [
        {
          index: true,
          element: <InicioPage />,
        },
        {
          path: 'theme-tester',
          element: <ThemesTester />,
        },
        {
          path: '/dashboard',
          children: [
            {
              index: true,
              element: <Dashboard />,
            },
            {
              path: 'users',
              element: <Users_Manage />,
            },
            {
              path: 'stores',
              element: <StoreManage />,
            },
            {
              path: 'categories',
              element: <CategoryManage />,
            },
            {
              path: 'products',
              element: <ProductsManage />,
            },
          ],
        },
        {
          path: 'profile',
          children: [
            {
              index: true,
              element: <MyProfilePage />,
            },
            {
              path: 'edit',
              element: <EditProfilePage />,
              action: editUserAction(),
            },
          ],
        },
        {
          path: 'orders',
          children: [
            {
              index: true,
              element: <PedidosPage />,
            },
            {
              path: 'orders/:id',
              element: <PedidoDetallePage />,
            },
          ],
        },
      ],
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
      element: <Navigate to='/' />,
    },
  ]);

  return <RouterProvider router={router} />;
};
