import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  PaginationState,
  Row,
  useReactTable,
} from "@tanstack/react-table";
import { EllipsisVertical, LucideIcon } from "lucide-react";
import { useState } from "react";
import { DropdownMenu } from "../navigation/DropdownMenu";
import { Pagination } from "./Pagination";

export interface TableColumn {
  key: string;
  title: string;
}

export interface TableAction<T> {
  label: string;
  Icon: LucideIcon;
  onClick: (row: Row<T>) => void;
}

interface DataTableProps<T> {
  data: T[];
  columns: TableColumn[];
  actions?: TableAction<T>[];
}

export const DataTable = <T,>({
  data,
  columns: baseColumns,
  actions,
}: DataTableProps<T>) => {
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });
  const columns: ColumnDef<T>[] = baseColumns.map((col) => ({
    header: col.title,
    accessorKey: col.key as string,
  }));

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: setPagination,
    state: {
      pagination,
    },
  });

  return (
    <div className="flex flex-col justify-center border border-slate-200 pb-5 dark:border-slate-700 items-center gap-8 bg-slate-100 dark:bg-slate-800 rounded-md">
      <div className="w-full overflow-x-auto border-b rounded-b-none rounded-md border-slate-200 bg-slate-100 dark:bg-slate-800 dark:border-slate-700">
        <table className="table-auto w-full">
          <thead className="border-b border-slate-200 dark:border-slate-700">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr
                className="font-bold text-xs text-left text-slate-900 dark:text-slate-100 uppercase break-words truncate"
                key={headerGroup.id}
              >
                {headerGroup.headers.map((header) => (
                  <th className="py-4 px-8 " key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </th>
                ))}

                {actions && actions?.length > 0 ? (
                  <th className="py-4 px-8">Acciones</th>
                ) : (
                  ""
                )}
              </tr>
            ))}
          </thead>

          <tbody>
            {table.getRowModel().rows.map((row, index) => (
              <tr
                className={
                  table.getRowModel().rows.length - 1 !== index
                    ? "border-b border-slate-200 dark:border-slate-700"
                    : ""
                }
                key={row.id}
              >
                {row.getVisibleCells().map((cell) => (
                  <td
                    className="text-sm py-4 px-8 text-slate-900 dark:text-slate-100 opacity-90"
                    key={cell.id}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}

                {actions && actions?.length > 0 ? (
                  <td className="py-4 px-8 text-center">
                    <DropdownMenu
                      Icon={EllipsisVertical}
                      items={actions.map((action) => ({
                        ...action,
                        onClick: () => action.onClick(row),
                      }))}
                    />
                  </td>
                ) : (
                  ""
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Pagination table={table} />

      <div className="text-xs lg:text-sm text-center text-slate-900 dark:text-slate-100">
        Mostrando {table.getRowModel().rows.length.toLocaleString()} de{" "}
        {table.getRowCount().toLocaleString()} filas
      </div>
    </div>
  );
};
