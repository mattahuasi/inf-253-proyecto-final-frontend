import { Fieldset, Legend } from "@headlessui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { BackButton } from "../../components/buttons/BackButton";
import { SubmitButton } from "../../components/buttons/SubmitButton";
import { FormCard } from "../../components/cards/FormCard";
import { SectionCard } from "../../components/cards/SectionCard";
import { TextInput } from "../../components/inputs/TextInput";
import { Role, RoleSchema } from "../../interfaces/role";
import { serialized } from "../../libs/fractal";
import { postRoleRequest } from "../../services/roles";

export default function RoleAdd() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Role>({ resolver: yupResolver(RoleSchema) });
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<Role> = async (data) => {
    const role = serialized(data, "roles");

    try {
      await postRoleRequest(role);
      toast.success("Rol creado correctamente");
      navigate("/roles/list");
    } catch (error) {
      if (error instanceof Error) {
        toast.error("Error: " + error.message);
      } else {
        toast.error("Error desconocido");
      }
    }
  };

  return (
    <SectionCard title="Agregar rol">
      <FormCard>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Fieldset className="grid gap-2 md:gap-6 mb-6">
            <Legend className="text-slate-900 dark:text-slate-100 opacity-70 font-bold uppercase text-sm">
              Datos generales
            </Legend>

            <Fieldset className="md:px-32 lg:px-56">
              <TextInput
                label="Nombre"
                type="text"
                placeholder="Super admin"
                {...register("name")}
                error={errors.name?.message}
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
