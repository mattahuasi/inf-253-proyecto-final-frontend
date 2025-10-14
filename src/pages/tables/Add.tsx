import { Fieldset, Legend } from "@headlessui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { BackButton } from "../../components/buttons/BackButton";
import { SubmitButton } from "../../components/buttons/SubmitButton";
import { FormCard } from "../../components/cards/FormCard";
import { SectionCard } from "../../components/cards/SectionCard";
import { NumberInput } from "../../components/inputs/NumberInput";
import { ListBoxWrapper } from "../../components/wrappers/ListBoxWrapper";
import { Status, Table, TableSchema } from "../../interfaces/table";
import { serialized } from "../../libs/fractal";
import { postTableRequest } from "../../services/tables";

export default function TableAdd() {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<Table>({
    resolver: yupResolver(TableSchema),
    defaultValues: { number: 0, ability: 0 },
  });
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<Table> = async (data) => {
    const table = serialized(data, "tables");

    try {
      await postTableRequest(table);
      toast.success("Mesa creada correctamente");
      navigate("/tables/list");
    } catch (error) {
      if (error instanceof Error) {
        toast.error("Error: " + error.message);
      } else {
        toast.error("Error desconocido");
      }
    }
  };

  return (
    <SectionCard title="Agregar mesa">
      <FormCard>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Fieldset className="grid md:grid-cols-3 gap-2 md:gap-6 mb-6">
            <Legend className="md:col-span-3 text-slate-900 dark:text-slate-100 opacity-70 font-bold uppercase text-sm">
              Datos generales
            </Legend>

            <NumberInput
              label="Número"
              placeholder="0-50"
              {...register("number")}
              error={errors.number?.message}
            />

            <Controller
              name="status"
              control={control}
              defaultValue={Status.Available}
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
                  error={errors.status?.message}
                />
              )}
            />

            <NumberInput
              label="Habilidad"
              placeholder="4-8"
              {...register("ability")}
              error={errors.ability?.message}
            />
          </Fieldset>

          <Fieldset className="flex justify-around items-center">
            <BackButton />
            <SubmitButton label="Guardar" />
          </Fieldset>
        </form>
      </FormCard>
    </SectionCard>
  );
}
