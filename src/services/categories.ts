import { DocumentObject } from "jsonapi-fractal";
import axios from "./axios";

export const getCategoriesRequest = () => axios.get("/categories");

export const getCategoryRequest = (id: string) =>
  axios.get(`/categories/${id}`);

export const postCategoryRequest = (data: DocumentObject) =>
  axios.post("/categories", data);

export const patchCategoryRequest = (id: string, data: DocumentObject) =>
  axios.patch(`/categories/${id}`, data);

export const deleteCategoryRequest = (id: string) =>
  axios.delete(`/categories/${id}`);
