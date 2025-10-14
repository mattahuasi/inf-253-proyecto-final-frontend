import { Fieldset, Legend } from "@headlessui/react";
import { UserCircle } from "lucide-react";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { TextInput } from "../../components/inputs/TextInput";
import { ListBoxWrapper } from "../../components/wrappers/ListBoxWrapper";
import { Customer } from "../../interfaces/customer";
import { Gender } from "../../interfaces/employee";

export default function CustomerShow({
  customer,
}: {
  customer: Customer | null;
}) {
  const { control, register, reset } = useForm<Customer>({
    disabled: true,
  });

  useEffect(() => {
    if (customer) {
      reset(customer);
    }
  }, [customer, reset]);

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
          defaultValue={customer?.gender}
          render={({ field: { onChange, value } }) => (
            <ListBoxWrapper
              label="Genero"
              value={{
                id: value,
                name: value === Gender.F ? "Femenino" : "Masculino",
              }}
              onChange={(customer) => onChange(customer.id)}
              options={[
                { id: Gender.F, name: "Femenino" },
                { id: Gender.M, name: "Masculino" },
              ]}
              disabled
            />
          )}
        />
      </Fieldset>
    </>
  );
}
