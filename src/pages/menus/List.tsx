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
import { Menu } from "../../interfaces/menu";
import { deserialized } from "../../libs/fractal";
import { deleteMenuRequest, getMenusRequest } from "../../services/menus";
import MenuShow from "./Show";

export default function MenusList() {
  const { response, loading, error } = useRequest(getMenusRequest);
  const { open, openDialog, closeDialog } = useDialog();
  const {
    open: openDelete,
    openDialog: openDeleteDialog,
    closeDialog: closeDeleteDialog,
  } = useDialog();
  const [menus, setMenus] = useState<Menu[]>([]);
  const [selected, setSelected] = useState<Menu | null>(null);
  const navigate = useNavigate();

  const columns = [
    { key: "name", title: "Nombre" },
    { key: "description", title: "Descripción" },
    { key: "price", title: "Precio" },
    { key: "photoUrl", title: "Foto" },
    { key: "stock", title: "Stock" },
    { key: "priority", title: "Prioridad" },
    { key: "enabled", title: "Habilitado" },
  ];

  const actions = [
    {
      label: "Ver",
      Icon: Eye,
      onClick: (row: Row<Menu>) => {
        setSelected(row.original);
        openDialog();
      },
    },
    {
      label: "Editar",
      Icon: Pencil,
      onClick: (row: Row<Menu>) => handleEdit(row.original.id || ""),
    },
    {
      label: "Eliminar",
      Icon: Trash,
      onClick: (row: Row<Menu>) => {
        setSelected(row.original);
        openDeleteDialog();
      },
    },
  ];

  useEffect(() => {
    if (response) {
      setMenus(deserialized(response?.data || []));
    }
  }, [response]);

  const handleEdit = (id: string) =>
    navigate("/menus/edit/" + id, { viewTransition: true });

  const handleDelete = async () => {
    if (selected) {
      try {
        await deleteMenuRequest(selected.id || "");
        toast.success("Menu eliminado correctamente");
        setMenus(menus.filter((menu) => menu.id !== selected.id));
        closeDeleteDialog();
      } catch {
        toast.error("Error al eliminar el menu");
      }
    }
  };

  if (error) return <ErrorMessage message={error.message} />;

  return (
    <SectionCard title="Lista de menus" addButton={{ path: "/menus/add" }}>
      {loading ? (
        <Loading />
      ) : (
        <DataTable data={menus} columns={columns} actions={actions} />
      )}

      <DialogCard
        title="Detalles del menu"
        open={open}
        onClose={closeDialog}
        extraButton={
          <OnClickButton
            label="Editar"
            onClick={() => handleEdit(selected?.id || "")}
          />
        }
      >
        <MenuShow menu={selected} />
      </DialogCard>

      <DeleteCard
        title="¿Eliminar Menu?"
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
