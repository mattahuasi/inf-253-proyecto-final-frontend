import { Fieldset, Legend } from "@headlessui/react";
import { SubmitHandler, useForm } from "react-hook-form";
import { SubmitButton } from "../../components/buttons/SubmitButton";
import { FormCard } from "../../components/cards/FormCard";
import { SectionCard } from "../../components/cards/SectionCard";
import { TextInput } from "../../components/inputs/TextInput";

interface FormData {
  password: string;
  newPassword: string;
  repeatPassword: string;
}

export default function ChangePassword() {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<FormData>();

  const newPassword = watch("newPassword");

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    console.log(data);
    reset();
  };

  return (
    <SectionCard title="Cambiar contraseña">
      <FormCard>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Fieldset className="w-full flex flex-col justify-center items-center gap-6 md:px-36 lg:px-44 py-6">
            <Legend className="text-slate-900 dark:text-slate-100 opacity-70 font-bold uppercase text-sm">
              Llene todos los campos para cambiar la contraseña
            </Legend>

            <TextInput
              label="Contraseña"
              placeholder="&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;"
              type="password"
              error={errors.password?.message}
              {...register("password", {
                minLength: {
                  value: 8,
                  message: "La contraseña debe tener mínimo 8 caracteres",
                },
                required: "La contraseña es obligatoria",
              })}
            />

            <TextInput
              label="Nueva contraseña"
              placeholder="&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;"
              type="password"
              error={errors.newPassword?.message}
              {...register("newPassword", {
                minLength: {
                  value: 8,
                  message: "La contraseña debe tener mínimo 8 caracteres",
                },
                required: "La nueva contraseña es obligatoria",
              })}
            />

            <TextInput
              label="Repetir contraseña"
              placeholder="&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;"
              type="password"
              error={errors.repeatPassword?.message}
              {...register("repeatPassword", {
                minLength: {
                  value: 8,
                  message: "La contraseña debe tener mínimo 8 caracteres",
                },
                required: "Repetir la nueva contraseña es obligatorio",
                validate: (value) =>
                  value === newPassword || "Las contraseñas no coinciden",
              })}
            />

            <SubmitButton label="Cambiar contraseña" />
          </Fieldset>
        </form>
      </FormCard>
    </SectionCard>
  );
}
