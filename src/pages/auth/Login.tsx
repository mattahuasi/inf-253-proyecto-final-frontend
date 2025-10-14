import { Fieldset } from "@headlessui/react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { Link } from "react-router";
import { SubmitButton } from "../../components/buttons/SubmitButton";
import { AuthCard } from "../../components/cards/AuthCard";
import { CheckboxInput } from "../../components/inputs/CheckboxInput";
import { TextInput } from "../../components/inputs/TextInput";
import { useAuth } from "../../hooks/useAuth";
import { LoginFormData } from "../../interfaces/auth";

export default function Login() {
  const { handleLogin } = useAuth();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<LoginFormData & { remember: boolean }>();

  const onSubmit: SubmitHandler<LoginFormData> = (data) => {
    handleLogin({ ...data, device_name: "Web App" });
  };

  return (
    <AuthCard
      title="Inicia sesión con tu cuenta"
      description="Por favor ingresa tu correo electrónico y contraseña para continuar."
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <Fieldset className="flex flex-col gap-4">
          <TextInput
            label="Correo electrónico"
            placeholder="esteban_schiller@gmail.com"
            type="email"
            error={errors.email?.message}
            {...register("email", {
              required: "El correo electrónico es obligatorio",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Ingresa un correo electrónico válido",
              },
            })}
          />

          <TextInput
            label="Contraseña"
            placeholder="&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;"
            type="password"
            error={errors.password?.message}
            {...register("password", {
              required: "La contraseña es obligatoria",
              minLength: {
                value: 8,
                message: "La contraseña debe tener al menos 8 caracteres",
              },
            })}
          />

          <Controller
            name="remember"
            control={control}
            defaultValue={false}
            render={({ field: { onChange, value } }) => (
              <CheckboxInput
                label="Recordar mi contraseña"
                checked={value}
                onChange={onChange}
              />
            )}
          />

          <SubmitButton label="Iniciar sesión" />
        </Fieldset>
      </form>

      <p className="text-center font-semibold text-sm text-slate-700 dark:text-slate-300">
        ¿No tienes una cuenta?
        <Link
          className="ml-1 font-bold text-blue-500 hover:text-blue-600 transition-all duration-300 ease-in-out"
          to="/auth/register"
        >
          Crear cuenta
        </Link>
      </p>
    </AuthCard>
  );
}
