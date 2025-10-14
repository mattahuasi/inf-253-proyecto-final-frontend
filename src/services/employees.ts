import { DocumentObject } from "jsonapi-fractal";
import axios from "./axios";

export const getEmployeesRequest = () => axios.get("/employees");

export const getEmployeeRequest = (id: string) => axios.get(`/employees/${id}`);

export const postEmployeeRequest = (data: DocumentObject) =>
  axios.post("/employees", data);

export const patchEmployeeRequest = (id: string, data: DocumentObject) =>
  axios.patch(`/employees/${id}`, data);

export const deleteEmployeeRequest = (id: string) =>
  axios.delete(`/employees/${id}`);
