import { PropsWithChildren } from "react";
import { Navigate } from "react-router";
import { useAuth } from "../../hooks/useAuth";

type PublicRoutesProps = PropsWithChildren;

export const PublicRoutes = ({ children }: PublicRoutesProps) => {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) return <Navigate to="/" replace />;

  return <>{children}</>;
};
