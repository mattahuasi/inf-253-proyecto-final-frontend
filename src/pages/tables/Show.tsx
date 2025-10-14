import { Fieldset, Legend } from "@headlessui/react";
import { Utensils } from "lucide-react";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { NumberInput } from "../../components/inputs/NumberInput";
import { ListBoxWrapper } from "../../components/wrappers/ListBoxWrapper";
import { Status, Table } from "../../interfaces/table";

export default function TableShow({ table }: { table: Table | null }) {
  const { register, control, reset } = useForm<Table>({ disabled: true });

  useEffect(() => {
    if (table) {
      reset(table);
    }
  }, [table, reset]);

  return (
    <>
      <Fieldset className="flex justify-center items-center mb-6">
        <Utensils className="text-slate-900 dark:text-slate-100" size={96} />
      </Fieldset>

      <Fieldset className="grid lg:grid-cols-3 gap-2 md:gap-6 mb-6">
        <Legend className="md:col-span-3 text-slate-900 dark:text-slate-100 opacity-70 font-bold uppercase text-sm">
          Datos generales
        </Legend>

        <NumberInput
          label="Número"
          placeholder="0-50"
          {...register("number")}
        />

        <Controller
          name="status"
          control={control}
          defaultValue={table?.status}
          render={({ field: { onChange, value } }) => (
            <ListBoxWrapper
              label="Genero"
              value={{
                id: value,
                name:
                  value === Status.Available
                    ? "Disponible"
                    : Status.Busy
                    ? "Ocupado"
                    : "Esperando",
              }}
              onChange={(table) => onChange(table.id)}
              options={[
                { id: Status.Available, name: "Disponible" },
                { id: Status.Busy, name: "Ocupado" },
                { id: Status.Waiting, name: "Esperando" },
              ]}
              disabled
            />
          )}
        />

        <NumberInput
          label="Habilidad"
          placeholder="4-8"
          {...register("ability")}
        />
      </Fieldset>
    </>
  );
}
