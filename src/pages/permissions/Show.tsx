import { Fieldset, Legend } from "@headlessui/react";
import { ShieldAlert } from "lucide-react";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { TextAreaInput } from "../../components/inputs/TextAreaInput";
import { TextInput } from "../../components/inputs/TextInput";
import { Permission } from "../../interfaces/permission";

export default function PermissionShow({
  permission,
}: {
  permission: Permission | null;
}) {
  const { register, control, reset } = useForm<Permission>({ disabled: true });

  useEffect(() => {
    if (permission) {
      reset(permission);
    }
  }, [permission, reset]);

  return (
    <>
      <Fieldset className="flex justify-center items-center mb-6">
        <ShieldAlert className="text-slate-900 dark:text-slate-100" size={96} />
      </Fieldset>

      <Fieldset className="grid md:grid-cols-2 gap-2 md:gap-6 mb-6">
        <Legend className="md:col-span-2 text-slate-900 dark:text-slate-100 opacity-70 font-bold uppercase text-sm">
          Datos generales
        </Legend>

        <TextInput label="Nombre" placeholder="Nombre" {...register("name")} />

        <TextInput label="Tipo" placeholder="Tipo" {...register("type")} />

        <Fieldset className="md:col-span-2">
          <Controller
            name="description"
            control={control}
            render={({ field: { value, onChange } }) => (
              <TextAreaInput
                label="Descripción"
                value={value || ""}
                onChange={onChange}
                disabled
              />
            )}
          />
        </Fieldset>
      </Fieldset>
    </>
  );
}
