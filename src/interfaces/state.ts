import { object, ObjectSchema, string } from "yup";

export interface State {
  id?: string;
  name: string;
  slug?: string;
  description: string;
  color: string;
  links?: Links | null;
}

export interface Links {
  self?: string;
}

export const StateSchema: ObjectSchema<State> = object({
  id: string(),
  name: string().required("El nombre es obligatorio"),
  slug: string(),
  description: string().required("La descripción es obligatoria"),
  color: string().required("El color es obligatorio"),
  links: object({
    self: string(),
  }),
});
