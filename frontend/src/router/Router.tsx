import { useEffect } from 'react';
import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from 'react-router-dom';

import { ThemesTester } from '../components/ui/themes-tester';
import { useAppDispatch } from '../store';
import { startCheckToken } from '../store/auth/authThunks';
import { loginUserAction, registerUserAction } from './actions/auth';
import { editUserAction } from './actions/main';
import { AdminRoute } from './utils/AdminRoute';
import { ProtectedRoute } from './utils/ProtectedRoute';
import { LayoutAuth, LoginPage, RegisterPage } from './views/auth';
import CategoryManage from './views/dashboard/manage/category-manage';
import ProductsManage from './views/dashboard/manage/products-manage';
import StoreManage from './views/dashboard/manage/store-manage';
import UsersManage from './views/dashboard/manage/users-manage';
import { EditProfilePage, LayoutMain, MyProfilePage } from './views/main';
import AboutUsPage from './views/main/about-us';
import Dashboard from './views/main/dashboard-admin';
import ProductDetailPage from './views/main/details-product';
import InicioPage from './views/main/inicio';
import Carrito from './views/main/orders/cart';
import PedidosPage from './views/main/orders/view-orders';
import PedidoDetallePage from './views/main/orders/view-product-orders';
import CategoryProductPage from './views/main/products-category';
import StoreProductsPage from './views/main/products-store';
import TiendasPage from './views/main/stores';
import TermsAndConditions from './views/main/termsandcontiditions';

export const Router = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(startCheckToken());
  }, [dispatch]);

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
          path: 'stores',
          element: <TiendasPage />,
        },
        {
          path: 'detailProduct/:id',
          element: <ProductDetailPage />,
        },
        {
          path: 'cart',
          element: <Carrito />,
        },
        {
          path: 'aboutUs',
          element: <AboutUsPage />,
        },
        {
          path: 'terms-and-conditions',
          element: <TermsAndConditions />,
        },
        {
          path: 'details-product/:id',
          element: <StoreProductsPage />,
        },
        {
          path: '/dashboard',
          element: <AdminRoute />,
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
          element: <ProtectedRoute />,
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
          element: <ProtectedRoute />,
          children: [
            {
              index: true,
              element: <PedidosPage />,
            },
            {
              path: ':id',
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
          action: loginUserAction(),
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
