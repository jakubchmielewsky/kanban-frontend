import { Navigate } from "react-router-dom";
import { useCurrentUser } from "../../features/auth/hooks/useCurrentUser";

type ProtectedRouteProps = {
  children: React.ReactNode;
};

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const userQuery = useCurrentUser();

  if (userQuery.isFetching || userQuery.isLoading) {
    return null;
  }

  if (!userQuery.data) {
    return <Navigate to="/login" replace />;
  }

  return children;
};
