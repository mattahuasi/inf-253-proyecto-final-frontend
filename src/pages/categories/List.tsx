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
import { Category } from "../../interfaces/category";
import { deserialized } from "../../libs/fractal";
import {
  deleteCategoryRequest,
  getCategoriesRequest,
} from "../../services/categories";
import CategoryShow from "./Show";

export default function CategoriesList() {
  const { response, loading, error } = useRequest(getCategoriesRequest);
  const { open, openDialog, closeDialog } = useDialog();
  const {
    open: openDelete,
    openDialog: openDeleteDialog,
    closeDialog: closeDeleteDialog,
  } = useDialog();
  const [categories, setCategories] = useState<Category[]>([]);
  const [selected, setSelected] = useState<Category | null>(null);
  const navigate = useNavigate();

  const columns = [
    { key: "name", title: "Nombre" },
    { key: "description", title: "Descripción" },
    { key: "priority", title: "Prioridad" },
  ];

  const actions = [
    {
      label: "Ver",
      Icon: Eye,
      onClick: (row: Row<Category>) => {
        setSelected(row.original);
        openDialog();
      },
    },
    {
      label: "Editar",
      Icon: Pencil,
      onClick: (row: Row<Category>) => handleEdit(row.original.id || ""),
    },
    {
      label: "Eliminar",
      Icon: Trash,
      onClick: (row: Row<Category>) => {
        setSelected(row.original);
        openDeleteDialog();
      },
    },
  ];

  useEffect(() => {
    if (response) {
      setCategories(deserialized(response?.data || []));
    }
  }, [response]);

  const handleEdit = (id: string) =>
    navigate("/categories/edit/" + id, { viewTransition: true });

  const handleDelete = async () => {
    if (selected) {
      try {
        await deleteCategoryRequest(selected.id || "");
        toast.success("Categoria eliminada correctamente");
        setCategories(
          categories.filter((category) => category.id !== selected.id)
        );
        closeDeleteDialog();
      } catch {
        toast.error("Error al eliminar el categoria");
      }
    }
  };

  if (error) return <ErrorMessage message={error.message} />;

  return (
    <SectionCard
      title="Lista de categorías"
      addButton={{ path: "/categories/add" }}
    >
      {loading ? (
        <Loading />
      ) : (
        <DataTable data={categories} columns={columns} actions={actions} />
      )}

      <DialogCard
        title="Detalles de la categoría"
        open={open}
        onClose={closeDialog}
        extraButton={
          <OnClickButton
            label="Editar"
            onClick={() => handleEdit(selected?.id || "")}
          />
        }
      >
        <CategoryShow category={selected} />
      </DialogCard>

      <DeleteCard
        title="Eliminar categoria"
        open={openDelete}
        handleDelete={handleDelete}
        onClose={closeDeleteDialog}
      >
        <p className="text-center py-4 px-8 font-bold text-md mb-8 text-slate-900 dark:text-slate-100 bg-slate-200 dark:bg-slate-700 rounded-md shadow">
          {`${selected?.name} de prioridad ${selected?.priority}`}
        </p>
      </DeleteCard>
    </SectionCard>
  );
}
