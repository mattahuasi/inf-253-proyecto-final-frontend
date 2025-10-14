import { DocumentObject } from "jsonapi-fractal";
import axios from "./axios";

export const getUsersRequest = () => axios.get("/users");

export const getUserRequest = (id: string) => axios.get(`/users/${id}`);

export const postUserRequest = (data: DocumentObject) =>
  axios.post("/users", data);

export const patchUserRequest = (id: string, data: DocumentObject) =>
  axios.patch(`/users/${id}`, data);

export const deleteUserRequest = (id: string) => axios.delete(`/users/${id}`);
