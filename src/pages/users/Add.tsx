import { Fieldset, Legend } from "@headlessui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { BackButton } from "../../components/buttons/BackButton";
import { SubmitButton } from "../../components/buttons/SubmitButton";
import { FormCard } from "../../components/cards/FormCard";
import { SectionCard } from "../../components/cards/SectionCard";
import { TextInput } from "../../components/inputs/TextInput";
import { ComboboxWrapper } from "../../components/wrappers/ComboBoxWrapper";
import { ListBoxWrapper } from "../../components/wrappers/ListBoxWrapper";
import { Customer } from "../../interfaces/customer";
import { Employee } from "../../interfaces/employee";
import { Role } from "../../interfaces/role";
import {
  UserFormData,
  UserFormDataSchema,
  UserType,
} from "../../interfaces/user";
import { deserialized, serialized } from "../../libs/fractal";
import { getCustomersRequest } from "../../services/customers";
import { getEmployeesRequest } from "../../services/employees";
import { getRolesRequest } from "../../services/roles";
import { postUserRequest } from "../../services/users";

export default function UserAdd() {
  const {
    control,
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<UserFormData>({ resolver: yupResolver(UserFormDataSchema) });
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [roles, setRoles] = useState<Role[]>([]);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const userType = watch("user.userType", UserType.customer);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const { data: customersData } = await getCustomersRequest();
      setCustomers(deserialized(customersData));

      const { data: rolesData } = await getRolesRequest();
      setRoles(deserialized(rolesData));
    };

    if (userType === UserType.customer) fetchData();
  }, [userType]);

  useEffect(() => {
    const fetchData = async () => {
      const { data: employeesData } = await getEmployeesRequest();
      setEmployees(deserialized(employeesData));

      const { data: rolesData } = await getRolesRequest();
      setRoles(deserialized(rolesData));
    };

    if (userType === UserType.employee) fetchData();
  }, [userType]);

  const onSubmit: SubmitHandler<UserFormData> = async (data) => {
    if (data.user.userType == UserType.employee) {
      if (!data.employee?.id) {
        toast.error("Debe seleccionar un cliente o un empleado");
        return;
      }

      const newUser = Object.assign(data.user, {
        employee: { id: data.employee.id },
        role: { id: data?.role?.id },
      });

      const dataSer = serialized(newUser, "users", ["employee", "role"]);

      try {
        await postUserRequest(dataSer);
        toast.success("Usuario creado correctamente");
        navigate("/home/dashboard", { viewTransition: true });
      } catch (error) {
        if (error instanceof Error) {
          toast.error("Error: " + error.message);
        } else {
          toast.error("Error desconocido");
        }
      }
    } else {
      if (!data.customer?.id) {
        toast.error("Debe seleccionar un cliente o un empleado");
        return;
      }

      const newUser = Object.assign(data.user, {
        customer: { id: data.customer.id },
        role: { id: data?.role?.id },
      });

      const dataSer = serialized(newUser, "users", ["customer", "role"]);

      try {
        await postUserRequest(dataSer);
        toast.success("Usuario creado correctamente");
        navigate("/home/dashboard", { viewTransition: true });
      } catch (error) {
        if (error instanceof Error) {
          toast.error("Error: " + error.message);
        } else {
          toast.error("Error desconocido");
        }
      }
    }
  };

  const findEmployeeFullName = (id: string | boolean | undefined) => {
    if (!id) return "";
    const employee = employees.find((employee) => employee.id === id);
    return `${employee?.names} ${employee?.maternalSurname} ${employee?.paternalSurname}`;
  };

  const findCustomerFullName = (id: string | boolean | undefined) => {
    if (!id) return "";
    const customer = customers.find((customer) => customer.id === id);
    return `${customer?.names} ${customer?.maternalSurname} ${customer?.paternalSurname}`;
  };

  return (
    <SectionCard title="Agregar usuario">
      <FormCard>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Fieldset className="grid lg:grid-cols-2 gap-2 md:gap-6 mb-6">
            <Legend className="md:col-span-2 text-slate-900 dark:text-slate-100 opacity-70 font-bold uppercase text-sm">
              Datos personales
            </Legend>

            <TextInput
              label="Nombre de usuario"
              type="text"
              placeholder="e_schiller"
              {...register("user.username")}
              error={errors.user?.username?.message}
            />

            <TextInput
              label="Correo electrónico"
              type="email"
              placeholder="esteban_schiller@gmail.com"
              {...register("user.email")}
              error={errors.user?.email?.message}
            />

            <Controller
              name="user.userType"
              control={control}
              defaultValue={UserType.customer}
              render={({ field: { onChange, value } }) => (
                <ListBoxWrapper
                  label="Tipo de usuario"
                  value={{
                    id: value,
                    name: value === UserType.customer ? "Cliente" : "Empleado",
                  }}
                  onChange={(selected) => onChange(selected.id)}
                  options={[
                    { id: UserType.customer, name: "Cliente" },
                    { id: UserType.employee, name: "Empleado" },
                  ]}
                  error={errors.user?.userType?.message}
                />
              )}
            />

            <Controller
              name="user.enabled"
              control={control}
              defaultValue={true}
              render={({ field: { onChange, value } }) => (
                <ListBoxWrapper
                  label="Habilitar"
                  value={{
                    id: value,
                    name: value ? "Habilitado" : "Deshabilitado",
                  }}
                  onChange={(selected) => onChange(selected.id)}
                  options={[
                    { id: true, name: "Habilitado" },
                    { id: false, name: "Deshabilitado" },
                  ]}
                  error={errors.user?.enabled?.message}
                />
              )}
            />

            {userType === UserType.employee && employees.length > 0 ? (
              <Controller
                name="employee"
                control={control}
                defaultValue={{
                  id: employees[0].id,
                  name: `${employees[0].names} ${employees[0].maternalSurname} ${employees[0].paternalSurname}`,
                }}
                render={({ field: { onChange, value } }) => (
                  <ComboboxWrapper
                    label="Empleados disponibles"
                    value={{
                      id: value?.id,
                      name: findEmployeeFullName(value?.id),
                    }}
                    onChange={onChange}
                    options={employees.map((employee) => ({
                      id: employee.id,
                      name: `${employee.names} ${employee.maternalSurname} ${employee.paternalSurname}`,
                    }))}
                    error={errors.employee?.message}
                  />
                )}
              />
            ) : (
              ""
            )}

            {userType === UserType.customer && roles.length > 0 ? (
              <Controller
                name="customer"
                control={control}
                defaultValue={{
                  id: customers[0].id,
                  name: findCustomerFullName(customers[0].id),
                }}
                render={({ field: { onChange, value } }) => (
                  <ComboboxWrapper
                    label="Clientes disponibles"
                    value={{
                      id: value?.id,
                      name: findCustomerFullName(value?.id),
                    }}
                    onChange={onChange}
                    options={customers.map((customer) => ({
                      id: customer.id,
                      name: `${customer.names} ${customer.maternalSurname} ${customer.paternalSurname}`,
                    }))}
                    error={errors.customer?.message}
                  />
                )}
              />
            ) : (
              ""
            )}

            {userType === UserType.employee ||
            (userType === UserType.customer && roles.length > 0) ? (
              <Controller
                name="role"
                control={control}
                defaultValue={{
                  id: roles[0].id,
                  name: roles[0].name,
                }}
                render={({ field: { onChange, value } }) => (
                  <ListBoxWrapper
                    label="Roles disponibles"
                    value={{
                      id: value?.id,
                      name: value?.name,
                    }}
                    onChange={onChange}
                    options={roles.map((role) => ({
                      id: role.id,
                      name: role.name,
                    }))}
                    error={errors.role?.message}
                  />
                )}
              />
            ) : (
              ""
            )}
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
