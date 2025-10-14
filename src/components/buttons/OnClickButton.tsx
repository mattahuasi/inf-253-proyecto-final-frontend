import { Button } from "@headlessui/react";
import { FC } from "react";

interface OnClickButtonProps {
  label: string;
  onClick: () => void;
}

export const OnClickButton: FC<OnClickButtonProps> = ({ onClick, label }) => {
  return (
    <Button
      className="font-bold text-slate-100 text-md px-6 py-3 rounded-xl shadow border border-blue-500 bg-blue-500 hover:bg-blue-600 transition-all duration-300 ease-in-out"
      onClick={onClick}
    >
      {label}
    </Button>
  );
};
