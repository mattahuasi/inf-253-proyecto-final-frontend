import { Button } from "@headlessui/react";

export const CancelButton = ({ onClick }: { onClick: () => void }) => {
  return (
    <Button
      className="font-bold text-slate-900 dark:text-slate-100 text-md px-6 py-3 rounded-xl shadow bg-slate-200 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 hover:border-slate-400 hover:dark:border-slate-500 transition-all duration-300 ease-in-out"
      onClick={onClick}
    >
      Cancelar
    </Button>
  );
};
