import { createContext } from "react";
import { AuthUser, LoginFormData } from "../interfaces/auth";

interface AuthContext {
  isAuthenticated?: boolean | null;
  authUser?: AuthUser | null;
  handleLogin: (credentials: LoginFormData) => Promise<void>;
  handleLogout: () => Promise<void>;
  updateAuthUser: (user: AuthUser) => void;
}

export const AuthContext = createContext<AuthContext | undefined>(undefined);
