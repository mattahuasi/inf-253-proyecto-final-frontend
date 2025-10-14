import { Fieldset, Legend } from "@headlessui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { UserCircle } from "lucide-react";
import { useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { BackButton } from "../../components/buttons/BackButton";
import { OnClickButton } from "../../components/buttons/OnClickButton";
import { SubmitButton } from "../../components/buttons/SubmitButton";
import { FormCard } from "../../components/cards/FormCard";
import { SectionCard } from "../../components/cards/SectionCard";
import { TextInput } from "../../components/inputs/TextInput";
import { ListBoxWrapper } from "../../components/wrappers/ListBoxWrapper";
import { useAuth } from "../../hooks/useAuth";
import { AuthUser, AuthUserSchema } from "../../interfaces/auth";
import { Gender } from "../../interfaces/employee";
import { pathAuthUserRequest } from "../../services/auth";

export default function Profile() {
  const [disabled, setDisabled] = useState(true);
  const { authUser, updateAuthUser } = useAuth();
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthUser>({
    resolver: yupResolver(AuthUserSchema),
    defaultValues: {
      username: authUser?.username,
      paternal_surname: authUser?.paternal_surname,
      maternal_surname: authUser?.maternal_surname,
      names: authUser?.names,
      phone: authUser?.phone,
      email: authUser?.email,
      gender: authUser?.gender,
    },

    disabled: disabled,
  });

  const handleDisable = () => {
    setDisabled(!disabled);
  };

  const onSubmit: SubmitHandler<AuthUser> = async (data) => {
    try {
      const response = await pathAuthUserRequest(data);
      if (response.status === 200) {
        updateAuthUser(response.data);
        toast.success("Datos actualizados correctamente");
      } else {
        toast.error("Error al actualizar los datos");
      }
      handleDisable();
    } catch {
      toast.error("Error al actualizar los datos");
    }
  };

  return (
    <SectionCard title="Información de mi cuenta">
      <FormCard>
        <Fieldset className="flex justify-center items-center mb-6">
          <UserCircle
            className="text-slate-900 dark:text-slate-100"
            size={128}
          />
        </Fieldset>

        <form onSubmit={handleSubmit(onSubmit)}>
          <Fieldset className="grid lg:grid-cols-2 gap-2 md:gap-6 mb-6">
            <Legend className="md:col-span-2 text-slate-900 dark:text-slate-100 opacity-70 font-bold uppercase text-sm">
              Datos personales
            </Legend>

            <TextInput
              label="Nombre de usuario"
              type="text"
              placeholder="estaban"
              {...register("username")}
              error={errors.username?.message}
            />

            <TextInput
              label="Nombres"
              type="text"
              placeholder="Esteban"
              {...register("names")}
              error={errors.names?.message}
            />

            <TextInput
              label="Apellido paterno"
              type="text"
              placeholder="Schiller"
              {...register("paternal_surname")}
              error={errors.paternal_surname?.message}
            />

            <TextInput
              label="Apellido materno"
              type="text"
              placeholder="Schiller"
              {...register("maternal_surname")}
              error={errors.maternal_surname?.message}
            />

            <TextInput
              label="Teléfono"
              type="tel"
              placeholder="76543210"
              {...register("phone")}
              error={errors.phone?.message}
            />

            <TextInput
              label="Correo electrónico"
              type="email"
              placeholder="esteban_schiller@gmail.com"
              {...register("email")}
              error={errors.email?.message}
            />

            <Controller
              name="gender"
              control={control}
              defaultValue={authUser?.gender}
              render={({ field: { onChange, value } }) => (
                <ListBoxWrapper
                  label="Genero"
                  value={{
                    id: value,
                    name: value === Gender.F ? "Femenino" : "Masculino",
                  }}
                  onChange={(selected) => onChange(selected.id)}
                  options={[
                    { id: Gender.F, name: "Femenino" },
                    { id: Gender.M, name: "Masculino" },
                  ]}
                  disabled={disabled}
                  error={errors.gender?.message}
                />
              )}
            />

            <Controller
              name="role"
              control={control}
              defaultValue={authUser?.role}
              render={({ field: { onChange, value } }) => (
                <ListBoxWrapper
                  label="Rol"
                  value={{ id: value || "1", name: value || "" }}
                  onChange={onChange}
                  options={[]}
                  disabled
                  error={errors.role?.message}
                />
              )}
            />
          </Fieldset>

          <Fieldset className="flex justify-around items-center">
            <BackButton />
            {disabled ? (
              <OnClickButton label="Editar" onClick={handleDisable} />
            ) : (
              <SubmitButton label="Guardar cambios" />
            )}
          </Fieldset>
        </form>
      </FormCard>
    </SectionCard>
  );
}
