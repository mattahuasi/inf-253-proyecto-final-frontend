import { Fieldset, Legend } from "@headlessui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import slug from "slug";
import { BackButton } from "../../components/buttons/BackButton";
import { SubmitButton } from "../../components/buttons/SubmitButton";
import { FormCard } from "../../components/cards/FormCard";
import { SectionCard } from "../../components/cards/SectionCard";
import { TextAreaInput } from "../../components/inputs/TextAreaInput";
import { TextInput } from "../../components/inputs/TextInput";
import { Category, CategorySchema } from "../../interfaces/category";
import { serialized } from "../../libs/fractal";
import { postCategoryRequest } from "../../services/categories";

export default function CategoryAdd() {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<Category>({ resolver: yupResolver(CategorySchema) });
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<Category> = async (data) => {
    const nameSlug = slug(data.name);
    data.slug = nameSlug;
    const category = serialized(data, "categories");

    try {
      await postCategoryRequest(category);
      toast.success("Categoría creada correctamente");
      navigate("/categories/list");
    } catch (error) {
      if (error instanceof Error) {
        toast.error("Error: " + error.message);
      } else {
        toast.error("Error desconocido");
      }
    }
  };

  return (
    <SectionCard title="Agregar categoría">
      <FormCard>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Fieldset className="grid lg:grid-cols-2 gap-2 md:gap-6 mb-6">
            <Legend className="md:col-span-2 text-slate-900 dark:text-slate-100 opacity-70 font-bold uppercase text-sm">
              Datos generales
            </Legend>

            <TextInput
              label="Nombre"
              type="text"
              placeholder="Entrantes"
              {...register("name")}
              error={errors.name?.message}
            />

            <TextInput
              label="Prioridad"
              type="text"
              placeholder="0-9"
              {...register("priority")}
              error={errors.priority?.message}
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
