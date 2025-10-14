import { Row } from "@tanstack/react-table";
import { Eye } from "lucide-react";
import { useEffect, useState } from "react";
import { DialogCard } from "../../components/cards/DialogCard";
import { SectionCard } from "../../components/cards/SectionCard";
import { DataTable } from "../../components/data-tables/DataTable";
import { ErrorMessage } from "../../components/ui/ErrorMessage";
import { Loading } from "../../components/ui/Loading";
import { useDialog } from "../../hooks/useDialog";
import { useRequest } from "../../hooks/useRequest";
import { Permission } from "../../interfaces/permission";
import { deserialized } from "../../libs/fractal";
import { getPermissionsRequest } from "../../services/permissions";
import PermissionShow from "./Show";

export default function PermissionsList() {
  const { response, loading, error } = useRequest(getPermissionsRequest);
  const { open, openDialog, closeDialog } = useDialog();

  const [permissions, setPermissions] = useState<Permission[]>([]);
  const [selected, setSelected] = useState<Permission | null>(null);

  const columns = [
    { key: "name", title: "Nombre" },
    { key: "description", title: "Descripción" },
    { key: "type", title: "Tipo" },
  ];

  const actions = [
    {
      label: "Ver",
      Icon: Eye,
      onClick: (row: Row<Permission>) => {
        setSelected(row.original);
        openDialog();
      },
    },
  ];

  useEffect(() => {
    if (response) {
      setPermissions(deserialized(response?.data || []));
    }
  }, [response]);

  if (error) return <ErrorMessage message={error.message} />;

  return (
    <SectionCard title="Lista de permisos">
      {loading ? (
        <Loading />
      ) : (
        <DataTable data={permissions} columns={columns} actions={actions} />
      )}

      <DialogCard
        title="Detalles del permiso"
        open={open}
        onClose={closeDialog}
      >
        <PermissionShow permission={selected} />
      </DialogCard>
    </SectionCard>
  );
}
