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
import {
  EditInfo,
  InfoPage,
  LayoutView,
} from './views/perfil-users/viewInfo/index';

export const Router = () => {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <LayoutMain />,
      children: [
        {
          index: true,
          element: <ThemesTester />,
        },
        {
          path: '/data',
          element: <Users_Manage />,
        },
        {
          path: '/panel',
          element: <Dashboard />,
        },
        {
          path: '/gestion_tiendas',
          element: <StoreManage />,
        },
        {
          path: '/gestion_categorias',
          element: <CategoryManage />,
        },
        {
          path: '/gestion_productos',
          element: <ProductsManage />,
        },
        {
          path: '/inicio',
          element: <InicioPage />,
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
      path: 'viewInfo',
      element: <LayoutView />,
      children: [
        {
          index: true,
          element: <InfoPage />,
        },
        {
          path: 'edit',
          element: <EditInfo />,
        },
      ],
    },
    {
      path: 'pedidos',
      element: <LayoutMain />,
      children: [
        {
          index: true,
          element: <PedidosPage />,
        },
        {
          path: 'detalle-pedido/:id',
          element: <PedidoDetallePage />,
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
