import { object, ObjectSchema, string } from "yup";

export interface Employee {
  id?: string;
  paternalSurname: string;
  maternalSurname: string;
  names: string;
  gender: Gender;
  phone: null | string;
  type: string;
  links?: Links | null;
}

export enum Gender {
  F = "F",
  M = "M",
}

export enum Type {
  AD = "AD",
  CO = "CO",
  CA = "CA",
  WA = "WA",
}

export interface Links {
  self?: string;
}

export const EmployeeSchema: ObjectSchema<Employee> = object({
  id: string(),
  paternalSurname: string().required("El apellido paterno es obligatorio"),
  maternalSurname: string().required("El apellido materno es obligatorio"),
  names: string().required("Los nombres son obligatorios"),
  gender: string<Gender>().required("El género es obligatorio"),
  phone: string()
    .required("El teléfono es obligatorio")
    .matches(/^\d+$/, "El teléfono solo debe contener números")
    .min(8, "El teléfono debe tener al menos 8 caracteres")
    .max(10, "El teléfono debe tener menos 10 caracteres"),
  type: string<Type>().required("El tipo es obligatorio"),
  links: object({ self: string() }).notRequired(),
});
