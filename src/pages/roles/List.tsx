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
import { Role } from "../../interfaces/role";
import { deserialized } from "../../libs/fractal";
import { deleteRoleRequest, getRolesRequest } from "../../services/roles";
import RoleShow from "./Show";

export default function RolesList() {
  const { response, loading, error } = useRequest(getRolesRequest);
  const { open, openDialog, closeDialog } = useDialog();
  const {
    open: openDelete,
    openDialog: openDeleteDialog,
    closeDialog: closeDeleteDialog,
  } = useDialog();
  const [roles, setRoles] = useState<Role[]>([]);
  const [selected, setSelected] = useState<Role | null>(null);
  const navigate = useNavigate();

  const columns = [
    { key: "id", title: "ID" },
    { key: "name", title: "Nombre de rol" },
  ];

  const actions = [
    {
      label: "Ver",
      Icon: Eye,
      onClick: (row: Row<Role>) => {
        setSelected(row.original);
        openDialog();
      },
    },
    {
      label: "Editar",
      Icon: Pencil,
      onClick: (row: Row<Role>) => handleEdit(row.original.id || ""),
    },
    {
      label: "Eliminar",
      Icon: Trash,
      onClick: (row: Row<Role>) => {
        setSelected(row.original);
        openDeleteDialog();
      },
    },
  ];

  useEffect(() => {
    if (response) {
      setRoles(deserialized(response?.data || []));
    }
  }, [response]);

  const handleEdit = (id: string) =>
    navigate("/roles/edit/" + id, { viewTransition: true });

  const handleDelete = async () => {
    if (selected) {
      try {
        await deleteRoleRequest(selected.id || "");
        toast.success("Rol eliminado correctamente");
        setRoles(roles.filter((role) => role.id !== selected.id));
        closeDeleteDialog();
      } catch {
        toast.error("Error al eliminar el rol");
      }
    }
  };

  if (error) return <ErrorMessage message={error.message} />;

  return (
    <SectionCard title="Lista de roles" addButton={{ path: "/roles/add" }}>
      {loading ? (
        <Loading />
      ) : (
        <DataTable data={roles} columns={columns} actions={actions} />
      )}

      <DialogCard
        title="Detalles del rol"
        open={open}
        onClose={closeDialog}
        extraButton={
          <OnClickButton
            label="Editar"
            onClick={() => handleEdit(selected?.id || "")}
          />
        }
      >
        <RoleShow role={selected} />
      </DialogCard>

      <DeleteCard
        title="Eliminar rol"
        open={openDelete}
        handleDelete={handleDelete}
        onClose={closeDeleteDialog}
      >
        <p className="text-center py-4 px-8 font-bold text-md mb-8 text-slate-900 dark:text-slate-100 bg-slate-200 dark:bg-slate-700 rounded-md shadow">
          {`${selected?.name} `}
        </p>
      </DeleteCard>
    </SectionCard>
  );
}
