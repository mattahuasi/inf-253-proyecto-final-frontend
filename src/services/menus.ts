import { DocumentObject } from "jsonapi-fractal";
import axios from "./axios";

export const getMenusRequest = () => axios.get("/menus");

export const getMenuRequest = (id: string) => axios.get(`/menus/${id}`);

export const getMenuCategoryRequest = (id: string) =>
  axios.get(`/menus/${id}/category`);

export const postMenuRequest = (data: DocumentObject) =>
  axios.post("/menus", data);

export const patchMenuRequest = (id: string, data: DocumentObject) =>
  axios.patch(`/menus/${id}`, data);

export const deleteMenuRequest = (id: string) => axios.delete(`/menus/${id}`);
