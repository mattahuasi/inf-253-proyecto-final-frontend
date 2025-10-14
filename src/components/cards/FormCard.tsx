import { ReactNode } from "react";

export const FormCard = ({ children }: { children: ReactNode }) => {
  return (
    <div className="p-4 lg:px-32 lg:py-12 rounded-xl shadow bg-slate-100 dark:bg-slate-800">
      {children}
    </div>
  );
};
