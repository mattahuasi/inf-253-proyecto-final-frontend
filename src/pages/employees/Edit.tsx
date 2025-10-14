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
import {
  Employee,
  EmployeeSchema,
  Gender,
  Type,
} from "../../interfaces/employee";
import { deserialized, serialized } from "../../libs/fractal";
import {
  getEmployeeRequest,
  patchEmployeeRequest,
} from "../../services/employees";

export default function EmployeeEdit() {
  const { id } = useParams();
  const { response, loading, error } = useRequest(getEmployeeRequest, id);
  const [employee, setEmployee] = useState<Employee | null>(null);
  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Employee>({
    resolver: yupResolver(EmployeeSchema),
  });
  const navigate = useNavigate();

  useEffect(() => {
    if (response) {
      const deserializedEmployee: Employee = deserialized(response.data);
      setEmployee(deserializedEmployee);
      reset(deserializedEmployee);
    }
  }, [response, reset]);

  if (error) return <ErrorMessage message={error.message} />;
  if (loading) return <Loading />;

  const onSubmit: SubmitHandler<Employee> = async (data) => {
    if (!id) return;

    const employeeSerialized = serialized(data, "employees");
    try {
      await patchEmployeeRequest(id, employeeSerialized);
      toast.success("Empleado actualizado correctamente");
      navigate("/employees/list");
    } catch (error) {
      if (error instanceof Error) {
        toast.error("Error: " + error.message);
      } else {
        toast.error("Error desconocido");
      }
    }
  };

  return (
    <SectionCard title="Editar empleado">
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
              defaultValue={employee?.gender}
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
