import { AuthUser, LoginFormData } from "../interfaces/auth";
import axios from "./axios";

export const loginRequest = (credentials: LoginFormData) =>
  axios.post("/login", credentials);

export const getAuthUserRequest = () => axios.get("/me");

export const pathAuthUserRequest = (data: AuthUser) => axios.patch("/me", data);

export const logoutRequest = () => axios.post("/logout");
