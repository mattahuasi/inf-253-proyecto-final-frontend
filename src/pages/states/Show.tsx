import { Fieldset, Legend } from "@headlessui/react";
import { AlarmClock } from "lucide-react";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { ColorInput } from "../../components/inputs/ColorInput";
import { TextAreaInput } from "../../components/inputs/TextAreaInput";
import { TextInput } from "../../components/inputs/TextInput";
import { State } from "../../interfaces/state";

export default function StateShow({ state }: { state: State | null }) {
  const { register, control, reset } = useForm<State>({ disabled: true });

  useEffect(() => {
    if (state) {
      reset(state);
    }
  }, [state, reset]);
  return (
    <>
      <Fieldset className="flex justify-center items-center mb-6">
        <AlarmClock className="text-slate-900 dark:text-slate-100" size={96} />
      </Fieldset>

      <Fieldset className="grid lg:grid-cols-3 gap-2 md:gap-6 mb-6">
        <Legend className="md:col-span-3 text-slate-900 dark:text-slate-100 opacity-70 font-bold uppercase text-sm">
          Datos generales
        </Legend>

        <TextInput
          label="Nombre"
          type="text"
          placeholder="Entregado"
          {...register("name")}
        />

        <ColorInput
          label="Color"
          placeholder="#ff0000"
          {...register("color")}
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
                disabled
              />
            )}
          />
        </Fieldset>
      </Fieldset>
    </>
  );
}
