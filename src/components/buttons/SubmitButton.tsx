import { Button } from "@headlessui/react";

export const SubmitButton = ({ label }: { label: string }) => {
  return (
    <Button
      className="font-bold text-slate-100 text-md px-6 py-3 rounded-xl shadow border border-blue-500 bg-blue-500 hover:bg-blue-600 transition-all duration-300 ease-in-out"
      type="submit"
    >
      {label}
    </Button>
  );
};
