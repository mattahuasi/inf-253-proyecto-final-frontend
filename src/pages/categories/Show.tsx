import { Fieldset, Legend } from "@headlessui/react";
import { Layers } from "lucide-react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { TextInput } from "../../components/inputs/TextInput";
import { Category } from "../../interfaces/category";

export default function CategoryShow({
  category,
}: {
  category: Category | null;
}) {
  const { register, reset } = useForm<Category>({ disabled: true });

  useEffect(() => {
    if (category) {
      reset(category);
    }
  }, [category, reset]);

  return (
    <>
      <Fieldset className="flex justify-center items-center mb-6">
        <Layers className="text-slate-900 dark:text-slate-100" size={96} />
      </Fieldset>

      <Fieldset className="grid lg:grid-cols-3 gap-2 md:gap-6 mb-6">
        <Legend className="md:col-span-3 text-slate-900 dark:text-slate-100 opacity-70 font-bold uppercase text-sm">
          Datos generales
        </Legend>

        <TextInput
          label="Nombre"
          type="text"
          placeholder="Entrantes"
          {...register("name")}
        />

        <TextInput
          label="Descripción"
          type="text"
          placeholder="Pequeñas porciones para abrir el apetito."
          {...register("description")}
        />

        <TextInput
          label="Prioridad"
          type="text"
          placeholder="0-9"
          {...register("priority")}
        />
      </Fieldset>
    </>
  );
}
