import { Navigate, Outlet, useLocation } from 'react-router-dom';

const ProtectedAdminRoute = () => {
    const adminInfo = JSON.parse(localStorage.getItem('adminInfo'));
    const location = useLocation();

    // If not logged in
    if (!adminInfo) {
        return <Navigate to="/admin/login" state={{ from: location }} replace />;
    }

    // If not an admin
    if (adminInfo.role !== 'admin') {
        return <Navigate to="/admin/login" replace />;
    }

    return <Outlet />;
};

export default ProtectedAdminRoute;
