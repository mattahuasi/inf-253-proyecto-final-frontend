import { Fieldset, Legend } from "@headlessui/react";
import { Soup } from "lucide-react";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { NumberInput } from "../../components/inputs/NumberInput";
import { TextAreaInput } from "../../components/inputs/TextAreaInput";
import { TextInput } from "../../components/inputs/TextInput";
import { ErrorMessage } from "../../components/ui/ErrorMessage";
import { Loading } from "../../components/ui/Loading";
import { ListBoxWrapper } from "../../components/wrappers/ListBoxWrapper";
import { useRequest } from "../../hooks/useRequest";
import { Category } from "../../interfaces/category";
import { Menu, Priority } from "../../interfaces/menu";
import { deserialized } from "../../libs/fractal";
import { getMenuCategoryRequest } from "../../services/menus";

export default function MenuShow({ menu }: { menu: Menu | null }) {
  const { control, register, reset } = useForm<Menu>({
    disabled: true,
  });
  const { response, loading, error } = useRequest(
    getMenuCategoryRequest,
    menu?.id
  );
  const [category, setCategory] = useState<Category | null>(null);

  useEffect(() => {
    if (response?.data) {
      const deserializedCategory: Category = deserialized(response.data);
      setCategory(deserializedCategory);
    }

    if (menu) {
      reset(menu);
    }
  }, [menu, reset, response]);

  if (error) return <ErrorMessage message={error.message} />;
  if (loading) return <Loading />;

  return (
    <>
      <Fieldset className="flex justify-center items-center mb-6">
        <Soup className="text-slate-900 dark:text-slate-100" size={96} />
      </Fieldset>

      <Fieldset className="grid lg:grid-cols-2 gap-2 md:gap-6 mb-6">
        <Legend className="md:col-span-2 text-slate-900 dark:text-slate-100 opacity-70 font-bold uppercase text-sm">
          Datos generales
        </Legend>

        <TextInput
          label="Nombre"
          type="text"
          placeholder="Pollo a la brasa"
          {...register("name")}
        />

        <NumberInput label="Precio" placeholder="0" {...register("price")} />

        <NumberInput label="Stock" placeholder="0" {...register("stock")} />

        <Controller
          name="enabled"
          control={control}
          defaultValue={false}
          render={({ field: { onChange, value } }) => (
            <ListBoxWrapper
              label="Habilitado"
              value={{
                id: value,
                name: value === true ? "Habilitado" : "Deshabilitado",
              }}
              onChange={(enable) => onChange(enable.id)}
              options={[
                { id: true, name: "Habilitado" },
                { id: false, name: "Deshabilitado" },
              ]}
            />
          )}
        />

        <Controller
          name="priority"
          control={control}
          defaultValue={Priority.L}
          render={({ field: { onChange, value } }) => (
            <ListBoxWrapper
              label="Prioridad"
              value={{
                id: value,
                name: value === Priority.H ? "Alta" : "Baja",
              }}
              onChange={(priority) => onChange(priority.id)}
              options={[
                { id: Priority.H, name: "Alta" },
                { id: Priority.M, name: "Media" },
                { id: Priority.L, name: "Baja" },
              ]}
            />
          )}
        />

        <Controller
          name="category"
          control={control}
          defaultValue={category?.id}
          render={({ field: { onChange, value } }) => (
            <ListBoxWrapper
              label="Categoría"
              value={{
                id: value?.toString() || category?.id || "",
                name: category?.name || "Seleccione una categoría",
              }}
              onChange={(selected) => onChange(selected.id)}
              options={[]}
              disabled
            />
          )}
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
