import { Row } from "@tanstack/react-table";
import { Eye, Pencil, Trash } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { DeleteCard } from "../../components/cards/DeleteCard";
import { SectionCard } from "../../components/cards/SectionCard";
import { DataTable } from "../../components/data-tables/DataTable";
import { ErrorMessage } from "../../components/ui/ErrorMessage";
import { Loading } from "../../components/ui/Loading";
import { useDialog } from "../../hooks/useDialog";
import { useRequest } from "../../hooks/useRequest";
import { User } from "../../interfaces/user";
import { deserialized } from "../../libs/fractal";
import { deleteUserRequest, getUsersRequest } from "../../services/users";

export default function UsersList() {
  const { response, loading, error } = useRequest(getUsersRequest);
  // const { open, openDialog, closeDialog } = useDialog();
  const {
    open: openDelete,
    openDialog: openDeleteDialog,
    closeDialog: closeDeleteDialog,
  } = useDialog();
  const [users, setUsers] = useState<User[]>([]);
  const [selected, setSelected] = useState<User | null>(null);
  const navigate = useNavigate();

  const columns = [
    { key: "id", title: "ID" },
    { key: "username", title: "Nombre de usuario" },
    { key: "email", title: "Email" },
    { key: "enabled", title: "Estado" },
    { key: "userType", title: "Tipo" },
  ];

  const actions = [
    {
      label: "Ver",
      Icon: Eye,
      onClick: (row: Row<User>) => {
        setSelected(row.original);
        // openDialog();
      },
    },
    {
      label: "Editar",
      Icon: Pencil,
      onClick: (row: Row<User>) => handleEdit(row.original.id || ""),
    },
    {
      label: "Eliminar",
      Icon: Trash,
      onClick: (row: Row<User>) => {
        setSelected(row.original);
        openDeleteDialog();
      },
    },
  ];

  useEffect(() => {
    if (response) {
      setUsers(deserialized(response?.data || []));
    }
  }, [response]);

  const handleEdit = (id: string) =>
    navigate("/users/edit/" + id, { viewTransition: true });

  const handleDelete = async () => {
    if (selected) {
      try {
        await deleteUserRequest(selected.id || "");
        toast.success("Usuario eliminado correctamente");
        setUsers(users.filter((user) => user.id !== selected.id));
        closeDeleteDialog();
      } catch {
        toast.error("Error al eliminar el usuario");
      }
    }
  };

  if (error) return <ErrorMessage message={error.message} />;

  return (
    <SectionCard title="Listar de usuarios" addButton={{ path: "/users/add" }}>
      {loading ? (
        <Loading />
      ) : (
        <DataTable data={users} columns={columns} actions={actions} />
      )}

      <DeleteCard
        title="Eliminar empleado"
        open={openDelete}
        handleDelete={handleDelete}
        onClose={closeDeleteDialog}
      >
        <p className="text-center py-4 px-8 font-bold text-md mb-8 text-slate-900 dark:text-slate-100 bg-slate-200 dark:bg-slate-700 rounded-md shadow">
          {`${selected?.username} `}
        </p>
      </DeleteCard>
    </SectionCard>
  );
}
