import { Suspense, lazy } from "react";
import { createBrowserRouter } from "react-router-dom";
import Loading from "../components/Loading/Loading";
import { UpSim } from "../pages/admin/UpSim";
import AdminHome from "../pages/admin/AdminHome";

const ThueSimVip = lazy(() => import('../pages/ThueSimVip'));
const Home = lazy(() => import('../pages/Home'));
const ErrorPage = lazy(() => import('../pages/ErrorPage'));
const App = lazy(() => import('../App'));
const Admin = lazy(() => import('../pages/admin/Admin'));
const AdminOrder = lazy(() => import('../pages/admin/AdminOrder'));
const Login = lazy(() => import('../pages/admin/Login'));
const FinishedOrder = lazy(() => import('../pages/admin/FinishedOrder'));

const ErrorBoundary = () => {
  return <ErrorPage />;
};

export const routes = createBrowserRouter([
  {
    path: "/",
    element: (
      <Suspense fallback={<Loading />}>
        <App />
      </Suspense>
    ),
    errorElement: <ErrorBoundary />,
    children: [
      { path: "", element: <Home /> },
      { path: "thuesimvip", element: <ThueSimVip /> },
    ],
  },
  {
    path: "/admin",
    element: (
      <Suspense fallback={<Loading />}>
        <Admin />
      </Suspense>
    ),
    errorElement: <ErrorBoundary />,
    children: [
      { path: "", element: <AdminHome /> },
      { path: "order", element: <AdminOrder /> },
      { path: "login", element: <Login /> },
      { path: "finished_order", element: <FinishedOrder /> },
      { path: "up_sim", element: <UpSim /> },
    ],
  },
]);
