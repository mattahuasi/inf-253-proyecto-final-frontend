import { DocumentObject } from "jsonapi-fractal";
import axios from "./axios";

export const getCustomersRequest = () => axios.get("/customers");

export const getCustomerRequest = (id: string) => axios.get(`/customers/${id}`);

export const postCustomerRequest = (data: DocumentObject) =>
  axios.post("/customers", data);

export const patchCustomerRequest = (id: string, data: DocumentObject) =>
  axios.patch(`/customers/${id}`, data);

export const deleteCustomerRequest = (id: string) =>
  axios.delete(`/customers/${id}`);
