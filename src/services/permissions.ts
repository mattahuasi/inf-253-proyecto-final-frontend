import axios from "./axios";

export const getPermissionsRequest = () => axios.get("/permissions");

export const getPermissionRequest = (id: string) =>
  axios.get(`/permissions/${id}`);

export const getPermissionRelationshipRolesRequest = (id: string) =>
  axios.get(`/permissions/${id}/relationship/roles`);

export const getPermissionRoles = (id: string) =>
  axios.get(`/permissions/${id}/roles`);
