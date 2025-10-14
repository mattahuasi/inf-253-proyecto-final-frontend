import { Row } from "@tanstack/react-table";
import { Eye, Pencil, Trash } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { OnClickButton } from "../../components/buttons/OnClickButton";
import { DeleteCard } from "../../components/cards/DeleteCard";
import { DialogCard } from "../../components/cards/DialogCard";
import { SectionCard } from "../../components/cards/SectionCard";
import { DataTable } from "../../components/data-tables/DataTable";
import { ErrorMessage } from "../../components/ui/ErrorMessage";
import { Loading } from "../../components/ui/Loading";
import { useDialog } from "../../hooks/useDialog";
import { useRequest } from "../../hooks/useRequest";
import { Employee } from "../../interfaces/employee";
import { deserialized } from "../../libs/fractal";
import {
  deleteEmployeeRequest,
  getEmployeesRequest,
} from "../../services/employees";
import EmployeeShow from "./Show";

export default function EmployeesList() {
  const { response, loading, error } = useRequest(getEmployeesRequest);
  const { open, openDialog, closeDialog } = useDialog();
  const {
    open: openDelete,
    openDialog: openDeleteDialog,
    closeDialog: closeDeleteDialog,
  } = useDialog();
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [selected, setSelected] = useState<Employee | null>(null);
  const navigate = useNavigate();

  const columns = [
    { key: "id", title: "ID" },
    { key: "paternalSurname", title: "Apellido Paterno" },
    { key: "maternalSurname", title: "Apellido Materno" },
    { key: "names", title: "Nombres" },
    { key: "gender", title: "Genero" },
    { key: "phone", title: "Teléfono" },
    { key: "type", title: "Tipo" },
  ];

  const actions = [
    {
      label: "Ver",
      Icon: Eye,
      onClick: (row: Row<Employee>) => {
        setSelected(row.original);
        openDialog();
      },
    },
    {
      label: "Editar",
      Icon: Pencil,
      onClick: (row: Row<Employee>) => handleEdit(row.original.id || ""),
    },
    {
      label: "Eliminar",
      Icon: Trash,
      onClick: (row: Row<Employee>) => {
        setSelected(row.original);
        openDeleteDialog();
      },
    },
  ];

  useEffect(() => {
    if (response) {
      setEmployees(deserialized(response?.data || []));
    }
  }, [response]);

  const handleEdit = (id: string) =>
    navigate("/employees/edit/" + id, { viewTransition: true });

  const handleDelete = async () => {
    if (selected) {
      try {
        await deleteEmployeeRequest(selected.id || "");
        toast.success("Empleado eliminado correctamente");
        setEmployees(
          employees.filter((employees) => employees.id !== selected.id)
        );
        closeDeleteDialog();
      } catch {
        toast.error("Error al eliminar el empleado");
      }
    }
  };

  if (error) return <ErrorMessage message={error.message} />;

  return (
    <SectionCard
      title="Lista de empleados"
      addButton={{ path: "/employees/add" }}
    >
      {loading ? (
        <Loading />
      ) : (
        <DataTable data={employees} columns={columns} actions={actions} />
      )}

      <DialogCard
        title="Detalles del empleado"
        open={open}
        onClose={closeDialog}
        extraButton={
          <OnClickButton
            label="Editar"
            onClick={() => handleEdit(selected?.id || "")}
          />
        }
      >
        <EmployeeShow employee={selected} />
      </DialogCard>

      <DeleteCard
        title="Eliminar empleado"
        open={openDelete}
        handleDelete={handleDelete}
        onClose={closeDeleteDialog}
      >
        <p className="text-center py-4 px-8 font-bold text-md mb-8 text-slate-900 dark:text-slate-100 bg-slate-200 dark:bg-slate-700 rounded-md shadow">
          {`${selected?.paternalSurname} ${selected?.maternalSurname} ${selected?.names}`}
        </p>
      </DeleteCard>
    </SectionCard>
  );
}
