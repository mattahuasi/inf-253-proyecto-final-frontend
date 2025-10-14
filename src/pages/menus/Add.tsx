import { Fieldset, Legend } from "@headlessui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import slug from "slug";
import { BackButton } from "../../components/buttons/BackButton";
import { SubmitButton } from "../../components/buttons/SubmitButton";
import { FormCard } from "../../components/cards/FormCard";
import { SectionCard } from "../../components/cards/SectionCard";
import { ImageInput } from "../../components/inputs/ImageInput";
import { NumberInput } from "../../components/inputs/NumberInput";
import { TextAreaInput } from "../../components/inputs/TextAreaInput";
import { TextInput } from "../../components/inputs/TextInput";
import { ErrorMessage } from "../../components/ui/ErrorMessage";
import { Loading } from "../../components/ui/Loading";
import { ListBoxWrapper } from "../../components/wrappers/ListBoxWrapper";
import { useRequest } from "../../hooks/useRequest";
import { Category } from "../../interfaces/category";
import { Menu, MenuSchema, Priority } from "../../interfaces/menu";
import { deserialized, serialized } from "../../libs/fractal";
import { getCategoriesRequest } from "../../services/categories";
import { postMenuRequest } from "../../services/menus";

export default function MenuAdd() {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Menu>({
    resolver: yupResolver(MenuSchema),
    defaultValues: { price: 0, stock: 0 },
  });
  const { response, loading, error } = useRequest(getCategoriesRequest);
  const [categories, setCategories] = useState<Category[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (response?.data) {
      const deserializedCategories: Category[] = deserialized(
        response.data || []
      );
      setCategories(deserializedCategories);
    }
  }, [response]);

  const onSubmit: SubmitHandler<Menu> = async (data) => {
    const nameSlug = slug(data.name);
    data.slug = nameSlug;
    const dataToSerialize = Object.assign(data, {
      category: { id: data.category },
    });

    const menu = serialized(dataToSerialize, "menus", ["category"]);

    try {
      await postMenuRequest(menu);
      toast.success("Menu creado correctamente");
      navigate("/menus/list");
    } catch (error) {
      if (error instanceof Error) {
        toast.error("Error: " + error.message);
      } else {
        toast.error("Error desconocido");
      }
    }
  };

  if (error) return <ErrorMessage message={error.message} />;
  if (loading) return <Loading />;

  return (
    <SectionCard title="Agregar menu">
      <FormCard>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Fieldset className="grid lg:grid-cols-2 gap-2 md:gap-6 mb-6">
            <Legend className="md:col-span-2 text-slate-900 dark:text-slate-100 opacity-70 font-bold uppercase text-sm">
              Datos generales
            </Legend>

            <TextInput
              label="Nombre"
              type="text"
              placeholder="Pollo a la brasa"
              {...register("name")}
              error={errors.name?.message}
            />

            <NumberInput
              label="Precio"
              placeholder="0"
              {...register("price")}
              error={errors.price?.message}
            />

            <NumberInput
              label="Stock"
              placeholder="0"
              {...register("stock")}
              error={errors.stock?.message}
            />

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
                  error={errors.enabled?.message}
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
                    name:
                      value === Priority.H
                        ? "Alta"
                        : value === Priority.M
                        ? "Media"
                        : "Baja",
                  }}
                  onChange={(priority) => onChange(priority.id)}
                  options={[
                    { id: Priority.H, name: "Alta" },
                    { id: Priority.M, name: "Media" },
                    { id: Priority.L, name: "Baja" },
                  ]}
                  error={errors.priority?.message}
                />
              )}
            />

            <Controller
              name="category"
              control={control}
              defaultValue={categories[0]?.id}
              render={({ field: { onChange, value } }) => (
                <ListBoxWrapper
                  label="Categoría"
                  value={{
                    id: value?.toString() || categories[0]?.id || "",
                    name:
                      categories.find((categories) => categories.id === value)
                        ?.name || "Seleccione una categoría",
                  }}
                  onChange={(selected) => onChange(selected.id)}
                  options={categories.map((category) => ({
                    id: category.id || "",
                    name: category.name,
                  }))}
                  error={errors.category?.message}
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
                    error={errors.description?.message}
                  />
                )}
              />
            </Fieldset>

            <ImageInput
              label="Imagen"
              {...register("photoUrl")}
              error={errors.photoUrl?.message}
            />
          </Fieldset>

          <Fieldset className="flex justify-around items-center">
            <BackButton />
            <SubmitButton label="Guardar" />
          </Fieldset>
        </form>
      </FormCard>
    </SectionCard>
  );
}
