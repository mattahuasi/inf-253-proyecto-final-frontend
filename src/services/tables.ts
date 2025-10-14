import { DocumentObject } from "jsonapi-fractal";
import axios from "./axios";

export const getTablesRequest = () => axios.get("/tables");

export const getTableRequest = (id: string) => axios.get("/tables/" + id);

export const postTableRequest = (data: DocumentObject) =>
  axios.post("/tables", data);

export const patchTableRequest = (id: string, data: DocumentObject) =>
  axios.patch("/tables/" + id, data);

export const deleteTableRequest = (id: string) => axios.delete("/tables/" + id);
