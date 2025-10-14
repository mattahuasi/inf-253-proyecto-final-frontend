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
import { State } from "../../interfaces/state";
import { deserialized } from "../../libs/fractal";
import { deleteStateRequest, getStatesRequest } from "../../services/states";
import StateShow from "./Show";

export default function StatesList() {
  const { response, loading, error } = useRequest(getStatesRequest);
  const { open, openDialog, closeDialog } = useDialog();
  const {
    open: openDelete,
    openDialog: openDeleteDialog,
    closeDialog: closeDeleteDialog,
  } = useDialog();
  const [states, setStates] = useState<State[]>([]);
  const [selected, setSelected] = useState<State | null>(null);
  const navigate = useNavigate();

  const columns = [
    { key: "name", title: "Nombre" },
    { key: "description", title: "Descripción" },
    { key: "color", title: "Color" },
  ];

  const actions = [
    {
      label: "Ver",
      Icon: Eye,
      onClick: (row: Row<State>) => {
        setSelected(row.original);
        openDialog();
      },
    },
    {
      label: "Editar",
      Icon: Pencil,
      onClick: (row: Row<State>) => handleEdit(row.original.id || ""),
    },
    {
      label: "Eliminar",
      Icon: Trash,
      onClick: (row: Row<State>) => {
        setSelected(row.original);
        openDeleteDialog();
      },
    },
  ];

  useEffect(() => {
    if (response) {
      setStates(deserialized(response?.data || []));
    }
  }, [response]);

  const handleEdit = (id: string) =>
    navigate("/states/edit/" + id, { viewTransition: true });

  const handleDelete = async () => {
    if (selected) {
      try {
        await deleteStateRequest(selected.id || "");
        toast.success("Estado eliminado correctamente");
        setStates(states.filter((category) => category.id !== selected.id));
        closeDeleteDialog();
      } catch {
        toast.error("Error al eliminar el estado");
      }
    }
  };

  if (error) return <ErrorMessage message={error.message} />;

  return (
    <SectionCard title="Lista de estados" addButton={{ path: "/states/add" }}>
      {loading ? (
        <Loading />
      ) : (
        <DataTable data={states} columns={columns} actions={actions} />
      )}

      <DialogCard
        title="Detalles del estado"
        open={open}
        onClose={closeDialog}
        extraButton={
          <OnClickButton
            label="Editar"
            onClick={() => handleEdit(selected?.id || "")}
          />
        }
      >
        <StateShow state={selected} />
      </DialogCard>

      <DeleteCard
        title="Eliminar categoria"
        open={openDelete}
        handleDelete={handleDelete}
        onClose={closeDeleteDialog}
      >
        <p className="text-center py-4 px-8 font-bold text-md mb-8 text-slate-900 dark:text-slate-100 bg-slate-200 dark:bg-slate-700 rounded-md shadow">
          {`${selected?.name}`}
        </p>
      </DeleteCard>
    </SectionCard>
  );
}
