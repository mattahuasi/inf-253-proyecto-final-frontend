import { Button } from "@headlessui/react";

export const DeleteButton = () => {
  return (
    <Button
      className="font-bold text-slate-100 text-md px-6 py-3 rounded-xl shadow border border-red-500 bg-red-500 hover:bg-red-600 transition-all duration-300 ease-in-out"
      type="submit"
    >
      Eliminar
    </Button>
  );
};
