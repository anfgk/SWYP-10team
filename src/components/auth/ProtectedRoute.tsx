import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../../stores/authStore";

const ProtectedRoute = () => {
  const { isLoggedIn, authLoading } = useAuthStore();

  if (authLoading) {
    return null;
  }

  return isLoggedIn ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
