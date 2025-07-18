import type { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const location = useLocation();

  // 로그인 상태 확인 (localStorage 또는 sessionStorage에서 토큰 확인)
  const isAuthenticated = () => {
    const token =
      localStorage.getItem("authToken") || sessionStorage.getItem("authToken");
    return !!token;
  };

  // 로그인되지 않은 경우 로그인 페이지로 리다이렉트
  // 개발 중에는 주석처리하여 접근 가능하도록 함
  // if (!isAuthenticated()) {
  //   return <Navigate to="/login" state={{ from: location }} replace />;
  // }

  // 로그인된 경우 자식 컴포넌트 렌더링
  return <>{children}</>;
};

export default ProtectedRoute;
