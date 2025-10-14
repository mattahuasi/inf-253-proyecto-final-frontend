import { ReactNode } from "react";

interface AuthCardProps {
  title: string;
  description?: string;
  children?: ReactNode;
}

export const AuthCard = ({ title, description, children }: AuthCardProps) => {
  return (
    <section className="flex flex-col gap-6 px-8 py-14 rounded-xl shadow bg-slate-100 dark:bg-slate-800">
      <header className="flex flex-col gap-2">
        <h1 className="font-bold text-xl text-center text-slate-900 dark:text-slate-100">
          {title}
        </h1>
        <p className="text-xs text-center text-slate-900 dark:text-slate-100 opacity-80">
          {description}
        </p>
      </header>
      {children}
    </section>
  );
};
