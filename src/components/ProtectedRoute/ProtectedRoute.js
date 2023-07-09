import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router";

export function ProtectedRoute({ children }) {
  const { isAuthenticated } = useSelector((state) => state.auth);
  const location = useLocation();

  return isAuthenticated ? <>{children}</> : <Navigate to="/login" />;
}
