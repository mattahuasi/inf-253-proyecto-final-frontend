import { object, ObjectSchema, string } from "yup";
import { Gender, Type } from "./employee";

export interface AuthUser {
  username: string;
  email: string;
  user_type?: Type;
  role?: string;
  paternal_surname: string;
  maternal_surname: string;
  names: string;
  gender: Gender;
  phone?: string;
}

export const AuthUserSchema: ObjectSchema<AuthUser> = object({
  username: string().required("El nombre de usuario es obligatorio"),
  email: string()
    .required("El correo electrónico es obligatorio")
    .email("El correo electrónico es inválido"),
  user_type: string<Type>(),
  role: string(),
  paternal_surname: string().required("El apellido paterno es obligatorio"),
  maternal_surname: string().required("El apellido materno es obligatorio"),
  names: string().required("Los nombres son obligatorios"),
  gender: string<Gender>().required("El género es obligatorio"),
  phone: string()
    .required("El teléfono es obligatorio")
    .matches(/^\d+$/, "El teléfono solo debe contener números")
    .min(8, "El teléfono debe tener al menos 8 caracteres")
    .max(10, "El teléfono debe tener menos 10 caracteres"),
});

export interface LoginFormData {
  email: string;
  password: string;
  device_name: string;
}
