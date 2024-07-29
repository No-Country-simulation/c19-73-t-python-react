import { Navigate, RouterProvider, createBrowserRouter } from 'react-router-dom';
import { ThemesTester } from '../components/ui/themes-tester';
import { registerUserAction } from './actions/auth';
import { LayoutAuth, LoginPage, RegisterPage } from './views/auth';
import { LayoutMain } from './views/main/Layout';
import { LayoutView, InfoPage, EditInfo } from './views/perfil-users/viewInfo/index';
import Users_Manage from './views/manage/users-manage';
import PedidosPage from './views/orders/view-orders';
import PedidoDetallePage from './views/orders/view-product-orders';
import Dashboard from './views/main/dashboard-admin';
import StoreManage from './views/manage/store-manage';

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
          element: <Dashboard/>
        },
        {
          path: '/gestion_tiendas',
          element:<StoreManage/>
        }
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
      element: <Navigate to="/" />,
    },
  ]);

  return <RouterProvider router={router} />;
};
