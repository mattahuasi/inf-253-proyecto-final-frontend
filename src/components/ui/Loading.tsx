import { GridLoader } from "react-spinners";

export const Loading = () => {
  return (
    <div className="flex flex-col justify-center items-center gap-4 h-screen bg-opacity-50">
      <GridLoader color="#3b82f6" />
      <h2 className="text-center text-sm font-bold text-blue-500">
        Cargando...
      </h2>
    </div>
  );
};
