import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import MainLayout from './layouts/MainLayout';
import { LoadingScreen } from './components/ui/LoadingScreen';
import { Toaster } from './components/ui/sonner';

const Home = lazy(() => import('./pages/Home'));
const Servicios = lazy(() => import('./pages/Servicios'));
const Proyectos = lazy(() => import('./pages/Proyectos'));
const Nosotros = lazy(() => import('./pages/Nosotros'));
const Legales = lazy(() => import('./pages/Legal/Legales'));
const Configurador = lazy(() => import('./pages/Configurador'));
const ProductDetail = lazy(() => import('./pages/ProductDetail'));
const Checkout = lazy(() => import('./pages/Checkout'));
const Arrepentimiento = lazy(() => import('./pages/Legal/Arrepentimiento'));
const Recursos = lazy(() => import('./pages/Recursos'));
const Dashboard = lazy(() => import('./pages/Admin/Dashboard'));
const Store = lazy(() => import('./pages/Store'));
const NotFound = lazy(() => import('./pages/NotFound'));
const GlobalError = lazy(() => import('./pages/GlobalError'));

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    errorElement: <GlobalError />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/servicios',
        element: <Servicios />,
      },
      {
        path: '/proyectos',
        element: <Proyectos />,
      },
      {
        path: '/nosotros',
        element: <Nosotros />,
      },
      {
        path: '/legales',
        element: <Legales />,
      },
      {
        path: '/arquitectura',
        element: <Configurador />,
      },
      {
        path: '/arrepentimiento',
        element: <Arrepentimiento />,
      },
      {
        path: '/recursos',
        element: <Recursos />,
      },
      {
        path: '/glastor-sys-admin',
        element: <Dashboard />,
      },
      {
        path: '/tienda',
        element: <Store />,
      },
      {
        path: '/tienda/:id',
        element: <ProductDetail />,
      },
      {
        path: '/checkout',
        element: <Checkout />,
      },
      {
        path: '*',
        element: <NotFound />,
      },
    ],
  },
]);

function App() {
  return (
    <Suspense fallback={<LoadingScreen />}>
      <RouterProvider router={router} />
      <Toaster position="bottom-right" />
    </Suspense>
  );
}

export default App;
