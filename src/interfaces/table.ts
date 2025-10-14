import { number, object, ObjectSchema, string } from "yup";

export interface Table {
  id?: string;
  number: number;
  status: Status;
  ability: number;
  links?: Links | null;
}

export interface Links {
  self?: string;
}

export enum Status {
  Available = "A",
  Busy = "B",
  Waiting = "W",
}

export const TableSchema: ObjectSchema<Table> = object({
  id: string(),
  number: number()
    .required("El número es obligatorio")
    .min(0, "El número debe ser mayor o igual a 0")
    .max(50, "El número debe ser menor o igual a 50"),
  status: string<Status>().required("El estado es obligatorio"),
  ability: number()
    .required("La capacidad es obligatoria")
    .min(4, "La habilidad debe ser mayor o igual a 4")
    .max(8, "La habilidad debe ser menor o igual a 8"),
  links: object({ self: string() }).notRequired(),
});
