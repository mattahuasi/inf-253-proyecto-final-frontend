import { Table } from "@tanstack/react-table";
import {
  ChevronFirst,
  ChevronLast,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

interface PaginationProps<T> {
  table: Table<T>;
}

export const Pagination = <T,>({ table }: PaginationProps<T>) => {
  const classDisabled = "text-slate-400 dark:text-slate-500";

  return (
    <div className="w-full flex flex-col lg:flex-row justify-between items-center gap-4 lg:gap-16 px-4 lg:px-16">
      <div className="text-slate-900 dark:text-slate-100">
        <button
          className={!table.getCanPreviousPage() ? classDisabled : ""}
          onClick={() => table.firstPage()}
          disabled={!table.getCanPreviousPage()}
        >
          <ChevronFirst />
        </button>

        <button
          className={!table.getCanPreviousPage() ? classDisabled : ""}
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          <ChevronLeft />
        </button>
        <button
          className={!table.getCanNextPage() ? classDisabled : ""}
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          <ChevronRight />
        </button>
        <button
          className={!table.getCanNextPage() ? classDisabled : ""}
          onClick={() => table.lastPage()}
          disabled={!table.getCanNextPage()}
        >
          <ChevronLast />
        </button>
      </div>

      <div className="flex items-center gap-2 lg:gap-6 text-sm text-slate-900 dark:text-slate-100">
        <p>
          Pagina <strong>{table.getState().pagination.pageIndex + 1}</strong> de{" "}
          <strong>{table.getPageCount().toLocaleString()}</strong>
        </p>
        <span>|</span>
        <div className="flex items-center gap-2">
          <p>Ir a la pagina:</p>
          <input
            className="block w-16 lg:w-20 text-center text-sm text-slate-800 dark:text-slate-200 bg-slate-300 dark:bg-slate-700 rounded-3xl py-2 border-none ring-1 ring-slate-400 dark:ring-slate-600 placeholder:text-slate-400 placeholder:text-sm dark:placeholder:text-slate-200 outline-none hover:ring-blue-500 hover:ring-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 ease-in-out"
            type="number"
            min="1"
            max={table.getPageCount()}
            defaultValue={table.getState().pagination.pageIndex + 1}
            onChange={(e) => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0;
              table.setPageIndex(page);
            }}
          />
        </div>
      </div>

      <select
        className="block text-sm text-slate-800 dark:text-slate-200 bg-slate-300 dark:bg-slate-700 rounded-3xl py-2 border-none ring-1 ring-slate-400 dark:ring-slate-600 placeholder:text-slate-400 placeholder:text-sm dark:placeholder:text-slate-200 outline-none hover:ring-blue-500 hover:ring-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 ease-in-out"
        value={table.getState().pagination.pageSize}
        onChange={(e) => {
          table.setPageSize(Number(e.target.value));
        }}
      >
        {[10, 20, 30, 40, 50, 100].map((pageSize) => (
          <option key={pageSize} value={pageSize}>
            Mostrar {pageSize}
          </option>
        ))}
      </select>
    </div>
  );
};
