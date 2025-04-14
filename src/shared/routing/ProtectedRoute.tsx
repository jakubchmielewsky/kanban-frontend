import { Navigate } from "react-router-dom";
import { useCurrentUser } from "../../features/auth/hooks/useCurrentUser";

type ProtectedRouteProps = {
  children: React.ReactNode;
};

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { user, isFetching, isLoading } = useCurrentUser();

  if (isFetching || isLoading) {
    return null;
  }

  if (!user) {
    console.log(user);
    return <Navigate to="/login" replace />;
  }

  return children;
};
