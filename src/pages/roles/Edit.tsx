import { Fieldset, Legend } from "@headlessui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router";
import { toast } from "react-toastify";
import { BackButton } from "../../components/buttons/BackButton";
import { SubmitButton } from "../../components/buttons/SubmitButton";
import { FormCard } from "../../components/cards/FormCard";
import { SectionCard } from "../../components/cards/SectionCard";
import { TextInput } from "../../components/inputs/TextInput";
import { ErrorMessage } from "../../components/ui/ErrorMessage";
import { Loading } from "../../components/ui/Loading";
import { useRequest } from "../../hooks/useRequest";
import { Role, RoleSchema } from "../../interfaces/role";
import { deserialized, serialized } from "../../libs/fractal";
import { getRoleRequest, patchRoleRequest } from "../../services/roles";

export default function RoleEdit() {
  const { id } = useParams();
  const { response, loading, error } = useRequest(getRoleRequest, id);
  const [role, setRole] = useState<Role | null>(null);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Role>({
    resolver: yupResolver(RoleSchema),
    defaultValues: { name: role?.name },
  });
  const navigate = useNavigate();

  useEffect(() => {
    if (response) {
      const deserializedRole: Role = deserialized(response.data);
      setRole(deserializedRole);
      reset(deserializedRole);
    }
  }, [response, reset]);

  if (error) return <ErrorMessage message={error.message} />;
  if (loading) return <Loading />;

  const onSubmit: SubmitHandler<Role> = async (data) => {
    if (!id) return;

    const roleSerialized = serialized(data, "roles");
    try {
      await patchRoleRequest(id, roleSerialized);
      toast.success("Rol actualizado correctamente");
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
    <SectionCard title="Editar rol">
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
