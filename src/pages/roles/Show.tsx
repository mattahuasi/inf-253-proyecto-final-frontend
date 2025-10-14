import { Fieldset, Legend } from "@headlessui/react";
import { Shield } from "lucide-react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { TextInput } from "../../components/inputs/TextInput";
import { Role } from "../../interfaces/role";

export default function RoleShow({ role }: { role: Role | null }) {
  const { register, reset } = useForm<Role>({ disabled: true });

  useEffect(() => {
    if (role) {
      reset(role);
    }
  }, [role, reset]);

  return (
    <>
      <Fieldset className="flex justify-center items-center mb-6">
        <Shield className="text-slate-900 dark:text-slate-100" size={96} />
      </Fieldset>

      <Fieldset className="grid gap-2 md:gap-6 mb-6">
        <Legend className="text-slate-900 dark:text-slate-100 opacity-70 font-bold uppercase text-sm">
          Datos generales
        </Legend>

        <TextInput
          label="Nombre"
          type="text"
          placeholder="Super admin"
          {...register("name")}
        />
      </Fieldset>
    </>
  );
}
