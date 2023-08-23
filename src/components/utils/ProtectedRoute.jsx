import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = ({ authorized, redirectPath = '/' }) => {
  if (!authorized) {
    return <Navigate to={redirectPath} replace />;
  }
  return <Outlet />;
};

export default ProtectedRoute;
