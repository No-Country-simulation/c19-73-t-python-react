import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from 'react-router-dom';

import { ThemesTester } from '../components/ui/themes-tester';
import { registerUserAction } from './actions/auth';
import { editUserAction } from './actions/main';
import { LayoutAuth, LoginPage, RegisterPage } from './views/auth';
import CategoryManage from './views/dashboard/manage/category-manage';
import ProductsManage from './views/dashboard/manage/products-manage';
import StoreManage from './views/dashboard/manage/store-manage';
import UsersManage from './views/dashboard/manage/users-manage';
import { EditProfilePage, LayoutMain, MyProfilePage } from './views/main';
import Dashboard from './views/main/dashboard-admin';
import InicioPage from './views/main/inicio';
import PedidosPage from './views/main/orders/view-orders';
import PedidoDetallePage from './views/main/orders/view-product-orders';
import CategoryProductPage from './views/main/products-category';

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
          path: 'categoryProduct/:id',
          element: <CategoryProductPage />,
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
              element: <UsersManage />,
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
