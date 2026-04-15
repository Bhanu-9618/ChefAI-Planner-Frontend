import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

// Wraps dashboard routes — redirects to /signin if not authenticated
export default function ProtectedRoute({ children }) {
  const { isLoggedIn } = useAuth();

  if (!isLoggedIn) {
    return <Navigate to="/signin" replace />;
  }

  return children;
}
