import { object, ObjectSchema, string } from "yup";
import { Gender } from "./employee";

export interface Customer {
  id?: string;
  paternalSurname: string;
  maternalSurname: string;
  names: string;
  gender: string;
  phone?: string;
  links?: Links | null;
}

export interface Links {
  self?: string;
}

export const CustomerSchema: ObjectSchema<Customer> = object({
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
  links: object({ self: string() }).notRequired(),
});
