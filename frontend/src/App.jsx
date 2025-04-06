import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Toaster } from 'react-hot-toast';
import './app.css'

import Layout from "./components/Layout";
import Home from "./pages/Home";
import Account from "./pages/Account";
import Collection from "./pages/Collection";
import NotFound from "./pages/NotFound";

import AdminLogin from "./pages/admin/adminLogin";
import AdminDashboard from "./pages/admin/AdminDashboard";
import ProtectedAdminRoute from "./pages/protectedRoute/ProtectedAdminRoute";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./cart/Cart";
import PlaceOrder from "./order/PlaceOrder";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: "home",
        element: <Home />
      },
      {
        path: "account",
        element: <Account />
      },
      {
        path: "collection",
        element: <Collection />
      },
      {
        path: "product/:id",
        element: <ProductDetail />
      },
      {
        path: "cart",
        element: <Cart />
      },
      {
        path: "place-order",
        element: <PlaceOrder />
      }
    ],
  },
  {
    path: "*",
    element: <NotFound /> // Catch-all for unmatched child routes
  },
  {
    path: "/admin/login",
    element: <AdminLogin />
  },
  {
    path: "/dashboard",
    element: <ProtectedAdminRoute />, // Protect this route
    children: [
      {
        index: true,
        element: <AdminDashboard />
      }
    ]
  }
]);

function App() {
  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <RouterProvider router={router} />
    </>
  );
}

export default App;
