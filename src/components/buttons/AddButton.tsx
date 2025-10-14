import { Link } from "react-router";

export interface AddButtonProps {
  path: string;
}

export const AddButton = ({ path }: AddButtonProps) => {
  return (
    <Link
      className="inline-block font-semibold px-5 py-3 rounded-xl shadow text-sm text-slate-100 border border-blue-500 bg-blue-500 hover:bg-blue-600 transition-all duration-300 ease-in-out"
      to={path}
      viewTransition
    >
      Agregar
    </Link>
  );
};
