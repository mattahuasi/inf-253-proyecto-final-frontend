import { PropsWithChildren, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { AuthContext } from "../contexts/AuthContext";
import { AuthUser, LoginFormData } from "../interfaces/auth";
import {
  getAuthUserRequest,
  loginRequest,
  logoutRequest,
} from "../services/auth";

type AuthProviderProps = PropsWithChildren;

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
    localStorage.getItem("token") !== null
  );
  const [authUser, setAuthUser] = useState<AuthUser | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      if (!isAuthenticated) return;

      try {
        const { data: user } = await getAuthUserRequest();
        setAuthUser(user);
        setIsAuthenticated(true);
      } catch (error) {
        throw new Error(error as string);
      }
    };

    fetchUser();
  }, [isAuthenticated]);

  const handleLogin = async (credentials: LoginFormData) => {
    try {
      const { data } = await loginRequest(credentials);

      setIsAuthenticated(true);
      localStorage.setItem("token", data.plain_text_token);
    } catch (error) {
      throw new Error(error as string);
    }
  };

  const handleLogout = async () => {
    try {
      await logoutRequest();
      setIsAuthenticated(false);
      setAuthUser(null);
      localStorage.removeItem("token");
      navigate("/auth/login", { viewTransition: true, replace: true });
    } catch (error) {
      throw new Error(error as string);
    }
  };

  const updateAuthUser = (user: AuthUser) => {
    setAuthUser(user);
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        authUser,
        handleLogin,
        handleLogout,
        updateAuthUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
