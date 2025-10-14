import { Fieldset, Legend } from "@headlessui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router";
import { toast } from "react-toastify";
import { BackButton } from "../../components/buttons/BackButton";
import { SubmitButton } from "../../components/buttons/SubmitButton";
import { FormCard } from "../../components/cards/FormCard";
import { SectionCard } from "../../components/cards/SectionCard";
import { TextInput } from "../../components/inputs/TextInput";
import { ErrorMessage } from "../../components/ui/ErrorMessage";
import { Loading } from "../../components/ui/Loading";
import { ListBoxWrapper } from "../../components/wrappers/ListBoxWrapper";
import { useRequest } from "../../hooks/useRequest";
import { Customer, CustomerSchema } from "../../interfaces/customer";
import { Gender } from "../../interfaces/employee";
import { deserialized, serialized } from "../../libs/fractal";
import {
  getCustomerRequest,
  patchCustomerRequest,
} from "../../services/customers";

export default function CustomerEdit() {
  const { id } = useParams();
  const { response, loading, error } = useRequest(getCustomerRequest, id);
  const [customer, setCustomer] = useState<Customer | null>(null);
  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Customer>({
    resolver: yupResolver(CustomerSchema),
  });
  const navigate = useNavigate();

  useEffect(() => {
    if (response) {
      const deserializedCustomer: Customer = deserialized(response.data);
      setCustomer(deserializedCustomer);
      reset(deserializedCustomer);
    }
  }, [response, reset]);

  if (error) return <ErrorMessage message={error.message} />;
  if (loading) return <Loading />;

  const onSubmit: SubmitHandler<Customer> = async (data) => {
    if (!id) return;

    const customerSerialized = serialized(data, "customers");
    try {
      await patchCustomerRequest(id, customerSerialized);
      toast.success("Cliente actualizado correctamente");
      navigate("/customers/list");
    } catch (error) {
      if (error instanceof Error) {
        toast.error("Error: " + error.message);
      } else {
        toast.error("Error desconocido");
      }
    }
  };

  return (
    <SectionCard title="Editar cliente">
      <FormCard>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Fieldset className="grid lg:grid-cols-2 gap-2 md:gap-6 mb-6">
            <Legend className="md:col-span-2 text-slate-900 dark:text-slate-100 opacity-70 font-bold uppercase text-sm">
              Datos personales
            </Legend>

            <TextInput
              label="Apellido paterno"
              type="text"
              placeholder="Schiller"
              {...register("paternalSurname")}
              error={errors.paternalSurname?.message}
            />

            <TextInput
              label="Apellido materno"
              type="text"
              placeholder="Schiller"
              {...register("maternalSurname")}
              error={errors.maternalSurname?.message}
            />

            <TextInput
              label="Nombres"
              type="text"
              placeholder="Esteban"
              {...register("names")}
              error={errors.names?.message}
            />

            <TextInput
              label="Teléfono"
              type="tel"
              placeholder="76543210"
              {...register("phone")}
              error={errors.phone?.message}
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
                  onChange={(selected) => onChange(selected.id)}
                  options={[
                    { id: Gender.F, name: "Femenino" },
                    { id: Gender.M, name: "Masculino" },
                  ]}
                  error={errors.gender?.message}
                />
              )}
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
