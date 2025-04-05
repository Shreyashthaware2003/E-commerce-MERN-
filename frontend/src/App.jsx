import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./components/Layout";
import Account from "./pages/Account";
import Home from "./pages/Home";
import AdminLogin from "./pages/admin/adminLogin";
import AdminDashboard from "./pages/admin/AdminDashboard.jsx";

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
    ],
  },
  {
    // admin routes
    path: 'admin/login',
    element: <AdminLogin />
  },
  {
    path: '/dashboard',
    element: <AdminDashboard />
  }
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
