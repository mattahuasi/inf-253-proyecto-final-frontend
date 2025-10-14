import { object, ObjectSchema, string } from "yup";

export interface Role {
  id?: string;
  name: string;
  links?: Links | null;
}

export interface Links {
  self?: string;
}

export const RoleSchema: ObjectSchema<Role> = object({
  id: string(),
  name: string().required("El nombre es obligatorio"),
  links: object({ self: string() }).notRequired(),
});
