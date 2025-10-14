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
import { Table } from "../../interfaces/table";
import { deserialized } from "../../libs/fractal";
import { deleteTableRequest, getTablesRequest } from "../../services/tables";
import TableShow from "./Show";

export default function TablesList() {
  const { response, loading, error } = useRequest(getTablesRequest);
  const { open, openDialog, closeDialog } = useDialog();
  const {
    open: openDelete,
    openDialog: openDeleteDialog,
    closeDialog: closeDeleteDialog,
  } = useDialog();
  const [tables, setTables] = useState<Table[]>([]);
  const [selected, setSelected] = useState<Table | null>(null);
  const navigate = useNavigate();

  const columns = [
    { key: "number", title: "Número" },
    { key: "status", title: "Estado" },
    { key: "ability", title: "Habilidad" },
  ];

  const actions = [
    {
      label: "Ver",
      Icon: Eye,
      onClick: (row: Row<Table>) => {
        setSelected(row.original);
        openDialog();
      },
    },
    {
      label: "Editar",
      Icon: Pencil,
      onClick: (row: Row<Table>) => handleEdit(row.original.id || ""),
    },
    {
      label: "Eliminar",
      Icon: Trash,
      onClick: (row: Row<Table>) => {
        setSelected(row.original);
        openDeleteDialog();
      },
    },
  ];

  useEffect(() => {
    if (response) {
      setTables(deserialized(response?.data || []));
    }
  }, [response]);

  const handleEdit = (id: string) =>
    navigate("/tables/edit/" + id, { viewTransition: true });

  const handleDelete = async () => {
    if (selected) {
      try {
        await deleteTableRequest(selected.id || "");
        toast.success("Mesa eliminada correctamente");
        setTables(tables.filter((table) => table.id !== selected.id));
        closeDeleteDialog();
      } catch {
        toast.error("Error al eliminar la mesa");
      }
    }
  };

  if (error) return <ErrorMessage message={error.message} />;

  return (
    <SectionCard title="Lista de mesas" addButton={{ path: "/tables/add" }}>
      {loading ? (
        <Loading />
      ) : (
        <DataTable data={tables} columns={columns} actions={actions} />
      )}

      <DialogCard
        title="Detalles de la mesa"
        open={open}
        onClose={closeDialog}
        extraButton={
          <OnClickButton
            label="Editar"
            onClick={() => handleEdit(selected?.id || "")}
          />
        }
      >
        <TableShow table={selected} />
      </DialogCard>

      <DeleteCard
        title="¿Eliminar mesa?"
        open={openDelete}
        handleDelete={handleDelete}
        onClose={closeDeleteDialog}
      >
        <p className="text-center py-4 px-8 font-bold text-md mb-8 text-slate-900 dark:text-slate-100 bg-slate-200 dark:bg-slate-700 rounded-md shadow">
          {`Numero de mesa ${selected?.number}`}
        </p>
      </DeleteCard>
    </SectionCard>
  );
}
