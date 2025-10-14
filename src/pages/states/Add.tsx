import { Fieldset, Legend } from "@headlessui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import slug from "slug";
import { BackButton } from "../../components/buttons/BackButton";
import { SubmitButton } from "../../components/buttons/SubmitButton";
import { FormCard } from "../../components/cards/FormCard";
import { SectionCard } from "../../components/cards/SectionCard";
import { ColorInput } from "../../components/inputs/ColorInput";
import { TextAreaInput } from "../../components/inputs/TextAreaInput";
import { TextInput } from "../../components/inputs/TextInput";
import { State, StateSchema } from "../../interfaces/state";
import { serialized } from "../../libs/fractal";
import { postStateRequest } from "../../services/states";

export default function StateAdd() {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<State>({ resolver: yupResolver(StateSchema) });
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<State> = async (data) => {
    console.log(data);
    const nameSlug = slug(data.name);
    data.slug = nameSlug;
    const state = serialized(data, "states");

    try {
      await postStateRequest(state);
      toast.success("Estado creado correctamente");
      navigate("/states/list");
    } catch (error) {
      if (error instanceof Error) {
        toast.error("Error: " + error.message);
      } else {
        toast.error("Error desconocido");
      }
    }
  };

  return (
    <SectionCard title="Agregar estado">
      <FormCard>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Fieldset className="grid lg:grid-cols-2 gap-2 md:gap-6 mb-6">
            <Legend className="md:col-span-2 text-slate-900 dark:text-slate-100 opacity-70 font-bold uppercase text-sm">
              Datos generales
            </Legend>

            <TextInput
              label="Nombre"
              type="text"
              placeholder="Entregado"
              {...register("name")}
              error={errors.name?.message}
            />

            <ColorInput
              label="Color"
              placeholder="#ff0000"
              {...register("color")}
              error={errors.color?.message}
            />

            <Fieldset className="md:col-span-2">
              <Controller
                name="description"
                control={control}
                render={({ field: { value, onChange } }) => (
                  <TextAreaInput
                    label="Descripción"
                    value={value || ""}
                    onChange={onChange}
                    error={errors.description?.message}
                  />
                )}
              />
            </Fieldset>
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
