import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import MainLayout from './layouts/MainLayout';
import { LoadingScreen } from './components/ui/LoadingScreen';

// Lazy loaded pages
const Home = lazy(() => import('./pages/Home'));
const Servicios = lazy(() => import('./pages/Servicios'));
const Proyectos = lazy(() => import('./pages/Proyectos'));
const Nosotros = lazy(() => import('./pages/Nosotros'));
const Legales = lazy(() => import('./pages/Legal/Legales'));
const Configurador = lazy(() => import('./pages/Configurador'));
const Arrepentimiento = lazy(() => import('./pages/Legal/Arrepentimiento'));
const NotFound = lazy(() => import('./pages/NotFound'));

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/servicios",
        element: <Servicios />,
      },
      {
        path: "/proyectos",
        element: <Proyectos />,
      },
      {
        path: "/nosotros",
        element: <Nosotros />,
      },
      {
        path: "/legales",
        element: <Legales />,
      },
      {
        path: "/arquitectura",
        element: <Configurador />,
      },
      {
        path: "/arrepentimiento",
        element: <Arrepentimiento />,
      },
      {
        path: "*",
        element: <NotFound />,
      }
    ],
  },
]);

function App() {
  return (
    <Suspense fallback={<LoadingScreen />}>
      <RouterProvider router={router} />
    </Suspense>
  );
}

export default App;
