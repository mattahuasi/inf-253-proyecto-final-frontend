import { object, ObjectSchema, string } from "yup";

export interface Category {
  id?: string;
  name: string;
  slug?: string | null;
  description?: string | null;
  priority: string;
  links?: Links | null;
}

export interface Links {
  self?: string;
}

export const CategorySchema: ObjectSchema<Category> = object({
  id: string(),
  name: string().required("El nombre es obligatorio"),
  slug: string().notRequired(),
  description: string().optional(),
  priority: string()
    .required("La prioridad es obligatoria")
    .matches(/^[0-9]$/, "La prioridad debe estar en el rango 0-9"),
  links: object({ self: string() }).notRequired(),
});
