import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import { Toaster } from 'react-hot-toast';
// import './App.css'

import Layout from "./components/Layout";
import Home from "./pages/Home";
import Account from "./pages/Account";
import Collection from "./pages/Collection";
import About from "./pages/About";
import NotFound from "./pages/NotFound";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./cart/Cart";
import PlaceOrder from "./order/PlaceOrder";
import Order from "./pages/Order";

import AdminLogin from "./pages/admin/adminLogin";
import AdminDashboard from "./pages/admin/AdminDashboard";
import ProtectedAdminRoute from "./pages/protectedRoute/ProtectedAdminRoute";


const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Navigate to="/home" replace />
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
        path: "about",
        element: <About />
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
      },
      {
        path: 'orders',
        element: <Order />
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
