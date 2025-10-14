import { boolean, number, object, ObjectSchema, string } from "yup";

export interface Menu {
  id?: string;
  name: string;
  slug?: string | null;
  description: string;
  price: number;
  photoUrl?: string | null;
  stock: number;
  priority: Priority;
  enabled: boolean;
  links?: Links | null;
  category: string;
}

export interface Links {
  self?: string;
}

export enum Priority {
  H = "H",
  M = "M",
  L = "L",
}

export const MenuSchema: ObjectSchema<Menu> = object({
  id: string(),
  name: string().required("El nombre es obligatorio"),
  slug: string().notRequired(),
  description: string().required("La descripción es obligatoria"),
  price: number().required("El precio es obligatorio"),
  photoUrl: string().notRequired(),
  stock: number().required("El stock es obligatorio"),
  priority: string<Priority>().required("La prioridad es obligatoria"),
  enabled: boolean().required("El estado es obligatorio"),
  links: object({ self: string() }).notRequired(),
  category: string().required("La categoría es obligatoria"),
});
