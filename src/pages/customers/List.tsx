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
import { Customer } from "../../interfaces/customer";
import { deserialized } from "../../libs/fractal";
import {
  deleteCustomerRequest,
  getCustomersRequest,
} from "../../services/customers";
import CustomerShow from "./Show";

export default function CustomersList() {
  const { response, loading, error } = useRequest(getCustomersRequest);
  const { open, openDialog, closeDialog } = useDialog();
  const {
    open: openDelete,
    openDialog: openDeleteDialog,
    closeDialog: closeDeleteDialog,
  } = useDialog();
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [selected, setSelected] = useState<Customer | null>(null);
  const navigate = useNavigate();

  const columns = [
    { key: "id", title: "ID" },
    { key: "paternalSurname", title: "Apellido Paterno" },
    { key: "maternalSurname", title: "Apellido Materno" },
    { key: "names", title: "Nombres" },
    { key: "gender", title: "Genero" },
    { key: "phone", title: "Teléfono" },
  ];

  const actions = [
    {
      label: "Ver",
      Icon: Eye,
      onClick: (row: Row<Customer>) => {
        setSelected(row.original);
        openDialog();
      },
    },
    {
      label: "Editar",
      Icon: Pencil,
      onClick: (row: Row<Customer>) => handleEdit(row.original.id || ""),
    },
    {
      label: "Eliminar",
      Icon: Trash,
      onClick: (row: Row<Customer>) => {
        setSelected(row.original);
        openDeleteDialog();
      },
    },
  ];

  useEffect(() => {
    if (response) {
      setCustomers(deserialized(response?.data || []));
    }
  }, [response]);

  const handleEdit = (id: string) =>
    navigate("/customers/edit/" + id, { viewTransition: true });

  const handleDelete = async () => {
    if (selected) {
      try {
        await deleteCustomerRequest(selected.id || "");
        toast.success("Cliente eliminado correctamente");
        setCustomers(
          customers.filter((customer) => customer.id !== selected.id)
        );
        closeDeleteDialog();
      } catch {
        toast.error("Error al eliminar el cliente");
      }
    }
  };

  if (error) return <ErrorMessage message={error.message} />;

  return (
    <SectionCard
      title="Lista de clientes"
      addButton={{ path: "/customers/add" }}
    >
      {loading ? (
        <Loading />
      ) : (
        <DataTable data={customers} columns={columns} actions={actions} />
      )}

      <DialogCard
        title="Detalles del cliente"
        open={open}
        onClose={closeDialog}
        extraButton={
          <OnClickButton
            label="Editar"
            onClick={() => handleEdit(selected?.id || "")}
          />
        }
      >
        <CustomerShow customer={selected} />
      </DialogCard>

      <DeleteCard
        title="Eliminar cliente"
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
