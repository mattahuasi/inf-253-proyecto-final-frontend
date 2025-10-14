import { Fieldset, Legend } from "@headlessui/react";
import { UserCircle } from "lucide-react";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { TextInput } from "../../components/inputs/TextInput";
import { ListBoxWrapper } from "../../components/wrappers/ListBoxWrapper";
import { Employee, Gender, Type } from "../../interfaces/employee";

export default function EmployeeShow({
  employee,
}: {
  employee: Employee | null;
}) {
  const { control, register, reset } = useForm<Employee>({
    disabled: true,
  });

  useEffect(() => {
    if (employee) {
      reset(employee);
    }
  }, [employee, reset]);

  return (
    <>
      <Fieldset className="flex justify-center items-center mb-6">
        <UserCircle className="text-slate-900 dark:text-slate-100" size={96} />
      </Fieldset>

      <Fieldset className="grid lg:grid-cols-3 gap-2 md:gap-6 mb-6">
        <Legend className="md:col-span-3 text-slate-900 dark:text-slate-100 opacity-70 font-bold uppercase text-sm">
          Datos personales
        </Legend>

        <TextInput
          label="Apellido paterno"
          type="text"
          placeholder="Schiller"
          {...register("paternalSurname")}
        />

        <TextInput
          label="Apellido materno"
          type="text"
          placeholder="Schiller"
          {...register("maternalSurname")}
        />

        <TextInput
          label="Nombres"
          type="text"
          placeholder="Esteban"
          {...register("names")}
        />

        <TextInput
          label="Teléfono"
          type="tel"
          placeholder="76543210"
          {...register("phone")}
        />

        <Controller
          name="gender"
          control={control}
          defaultValue={employee?.gender}
          render={({ field: { onChange, value } }) => (
            <ListBoxWrapper
              label="Genero"
              value={{
                id: value,
                name: value === Gender.F ? "Femenino" : "Masculino",
              }}
              onChange={(employee) => onChange(employee.id)}
              options={[
                { id: Gender.F, name: "Femenino" },
                { id: Gender.M, name: "Masculino" },
              ]}
              disabled
            />
          )}
        />

        <Controller
          name="type"
          control={control}
          defaultValue={employee?.type}
          render={({ field: { onChange, value } }) => (
            <ListBoxWrapper
              label="Tipo de empleado"
              value={{
                id: value,
                name:
                  value === Type.AD
                    ? "Administrador"
                    : value === Type.CO
                    ? "Cocinero"
                    : value === Type.CA
                    ? "Cajero"
                    : value === Type.WA
                    ? "Mesero"
                    : "",
              }}
              onChange={(selected) => onChange(selected.id)}
              options={[
                { id: Type.AD, name: "Administrador" },
                { id: Type.CO, name: "Cocinero" },
                { id: Type.CA, name: "Cajero" },
                { id: Type.WA, name: "Mesero" },
              ]}
            />
          )}
        />
      </Fieldset>
    </>
  );
}
