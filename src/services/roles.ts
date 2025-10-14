import { DocumentObject } from "jsonapi-fractal";
import axios from "./axios";

export const getRolesRequest = () => axios.get("/roles");

export const getRoleRequest = (id: string) => axios.get(`/roles/${id}`);

export const postRoleRequest = (data: DocumentObject) =>
  axios.post("/roles", data);

export const patchRoleRequest = (id: string, data: DocumentObject) =>
  axios.patch(`/roles/${id}`, data);

export const deleteRoleRequest = (id: string) => axios.delete(`/roles/${id}`);
