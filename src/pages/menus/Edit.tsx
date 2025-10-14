import { Fieldset, Legend } from "@headlessui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router";
import { toast } from "react-toastify";
import slug from "slug";
import { BackButton } from "../../components/buttons/BackButton";
import { SubmitButton } from "../../components/buttons/SubmitButton";
import { FormCard } from "../../components/cards/FormCard";
import { SectionCard } from "../../components/cards/SectionCard";
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
import {
  getMenuCategoryRequest,
  getMenuRequest,
  patchMenuRequest,
} from "../../services/menus";

export default function MenuEdit() {
  const { id } = useParams();
  const { response, loading, error } = useRequest(getMenuRequest, id);
  const {
    response: categoriesResponse,
    loading: categoriesLoading,
    error: categoriesError,
  } = useRequest(getCategoriesRequest);
  const {
    response: categoryResponse,
    loading: categoryLoading,
    error: categoryError,
  } = useRequest(getMenuCategoryRequest, id);
  const [category, setCategory] = useState<Category | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [menu, setMenu] = useState<Menu | null>(null);
  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Menu>({
    resolver: yupResolver(MenuSchema),
  });
  const navigate = useNavigate();

  useEffect(() => {
    if (response && categoriesResponse?.data) {
      const deserializedMenu: Menu = deserialized(response.data);
      const deserializedCategories: Category[] = deserialized(
        categoriesResponse.data || []
      );
      const deserializedCategory: Category | null = categoryResponse?.data
        ? deserialized(categoryResponse.data)
        : null;

      setMenu(deserializedMenu);
      setCategories(deserializedCategories);
      setCategory(deserializedCategory);

      reset({
        ...deserializedMenu,
        category: deserializedCategory?.id || deserializedMenu.category,
      });
    }
  }, [response, categoriesResponse, categoryResponse, reset]);

  if (error) return <ErrorMessage message={error.message} />;
  if (loading) return <Loading />;
  if (categoriesError)
    return <ErrorMessage message={categoriesError.message} />;
  if (categoriesLoading) return <Loading />;
  if (categoryError) return <ErrorMessage message={categoryError.message} />;
  if (categoryLoading) return <Loading />;

  const onSubmit: SubmitHandler<Menu> = async (data) => {
    if (!id) return;

    const nameSlug = slug(data.name);
    data.slug = nameSlug;
    const dataToSerialize = Object.assign(data, {
      category: { id: data.category },
    });

    const menuSerialized = serialized(dataToSerialize, "menus", ["category"]);
    try {
      await patchMenuRequest(id, menuSerialized);
      toast.success("Menu actualizado correctamente");
      navigate("/menus/list");
    } catch (error) {
      if (error instanceof Error) {
        toast.error("Error: " + error.message);
      } else {
        toast.error("Error desconocido");
      }
    }
  };

  return (
    <SectionCard title="Editar menu">
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
              defaultValue={menu?.enabled}
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
              defaultValue={menu?.priority}
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
              defaultValue={category?.id}
              render={({ field: { onChange, value } }) => (
                <ListBoxWrapper
                  label="Categoría"
                  value={{
                    id: value?.toString() || categories[0]?.id || "",
                    name:
                      categories.find((category) => category.id === value)
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
