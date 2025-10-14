import { Fieldset, Legend } from "@headlessui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router";
import { toast } from "react-toastify";
import { BackButton } from "../../components/buttons/BackButton";
import { SubmitButton } from "../../components/buttons/SubmitButton";
import { FormCard } from "../../components/cards/FormCard";
import { SectionCard } from "../../components/cards/SectionCard";
import { NumberInput } from "../../components/inputs/NumberInput";
import { ErrorMessage } from "../../components/ui/ErrorMessage";
import { Loading } from "../../components/ui/Loading";
import { ListBoxWrapper } from "../../components/wrappers/ListBoxWrapper";
import { useRequest } from "../../hooks/useRequest";
import { Status, Table, TableSchema } from "../../interfaces/table";
import { deserialized, serialized } from "../../libs/fractal";
import { getTableRequest, patchTableRequest } from "../../services/tables";

export default function TableEdit() {
  const { id } = useParams();
  const { response, loading, error } = useRequest(getTableRequest, id);
  const [table, setTable] = useState<Table | null>(null);
  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Table>({
    resolver: yupResolver(TableSchema),
  });
  const navigate = useNavigate();

  useEffect(() => {
    if (response) {
      const deserializedTable: Table = deserialized(response.data);
      setTable(deserializedTable);
      reset(deserializedTable);
    }
  }, [response, reset]);

  if (error) return <ErrorMessage message={error.message} />;
  if (loading) return <Loading />;

  const onSubmit: SubmitHandler<Table> = async (data) => {
    if (!id) return;

    const tableSerialized = serialized(data, "tables");
    try {
      await patchTableRequest(id, tableSerialized);
      toast.success("Mesa actualizada correctamente");
      navigate("/Tables/list");
    } catch (error) {
      if (error instanceof Error) {
        toast.error("Error: " + error.message);
      } else {
        toast.error("Error desconocido");
      }
    }
  };

  return (
    <SectionCard title="Editar mesa">
      <FormCard>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Fieldset className="grid md:grid-cols-3 gap-2 md:gap-6 mb-6">
            <Legend className="md:col-span-3 text-slate-900 dark:text-slate-100 opacity-70 font-bold uppercase text-sm">
              Datos personales
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
