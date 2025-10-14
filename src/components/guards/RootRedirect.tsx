import { Navigate } from "react-router";
import { useAuth } from "../../hooks/useAuth";
import { Loading } from "../ui/Loading";

export const RootRedirect = () => {
  const { isAuthenticated, authUser } = useAuth();

  if (isAuthenticated && !authUser) return <Loading />;

  return isAuthenticated ? (
    <Navigate to="/home/dashboard" replace />
  ) : (
    <Navigate to="/auth/login" replace />
  );
};
