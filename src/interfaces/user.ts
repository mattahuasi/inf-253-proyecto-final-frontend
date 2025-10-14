import { boolean, object, ObjectSchema, string } from "yup";

export interface User {
  id?: string;
  username: string;
  email: string;
  enabled: boolean;
  userType: string;
  links?: Links | null;
}

export interface Links {
  self?: string;
}

export enum UserType {
  employee = "employee",
  customer = "customer",
}

export const UserSchema: ObjectSchema<User> = object({
  id: string(),
  username: string().required("El nombre de usuario es obligatorio"),
  email: string().required("El email es obligatorio"),
  enabled: boolean().required("El estado es obligatorio"),
  userType: string<UserType>().required("El tipo de usuario es obligatorio"),
  links: object({ self: string() }).notRequired(),
});

export interface UserEmployee extends User {
  employee: { id: string };
  role: { id: string };
}

export interface UserCustomer extends User {
  customer: { id: string };
}

export interface UserFormData {
  user: User;
  employee?: { id?: string; name?: string };
  customer?: { id?: string; name?: string };
  role?: { id?: string; name?: string };
}

export const UserFormDataSchema: ObjectSchema<UserFormData> = object({
  user: object({
    username: string().required("El nombre de usuario es obligatorio"),
    email: string()
      .required("El email es obligatorio")
      .email("El correo electrónico es inválido"),
    enabled: boolean().required("El estado es obligatorio"),
    userType: string<UserType>().required("El tipo de usuario es obligatorio"),
  }),
  employee: object({
    id: string(),
    name: string(),
  }).optional(),
  role: object({
    id: string(),
    name: string(),
  }).optional(),
  customer: object({
    id: string(),
    name: string(),
  }).optional(),
});
