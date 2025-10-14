import { PropsWithChildren } from "react";
import { Navigate, useLocation } from "react-router";
import { useAuth } from "../../hooks/useAuth";
import { AuthUser } from "../../interfaces/auth";
import { Loading } from "../ui/Loading";

type ProtectedRoutesProps = PropsWithChildren & {
  allowedRoles?: AuthUser["role"][];
};

export const ProtectedRoutes = ({
  allowedRoles,
  children,
}: ProtectedRoutesProps) => {
  const { isAuthenticated, authUser } = useAuth();

  const location = useLocation();

  if (!authUser) return <Loading />;

  if (!isAuthenticated)
    return <Navigate to="/auth/login" state={{ from: location }} replace />;

  if (!allowedRoles?.includes(authUser?.role || ""))
    return <Navigate to="/" replace />;

  return <>{children}</>;
};
