import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/useAuth";

function PrivateRoute({ children }) {
  const { isAuthenticated, isLoading } = useAuth();
  const nav = useNavigate();
  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center text-3xl">
        Loading...
      </div>
    );
  }
  if (isAuthenticated) {
    return children;
  } else {
    nav("/login");
  }
}

export default PrivateRoute;
