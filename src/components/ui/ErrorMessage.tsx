import { ServerOff } from "lucide-react";

export const ErrorMessage = ({ message }: { message: string }) => {
  return (
    <section className="min-h-screen flex justify-center items-center rounded-xl shadow bg-slate-100 dark:bg-slate-800">
      <div className="flex flex-col gap-4">
        <h5 className="text-red-500 text-2xl font-bold text-center flex gap-2 items-center">
          <ServerOff /> {message}
        </h5>

        <p className="text-center text-sm text-slate-900 dark:text-slate-100">
          Por favor, vuelva a intentarlo o contacta con el administrador
        </p>
      </div>
    </section>
  );
};
