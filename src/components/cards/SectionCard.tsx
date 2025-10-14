import { FC, ReactNode } from "react";
import { AddButton, AddButtonProps } from "../buttons/AddButton";

interface BaseCardProps {
  title: string;
  children?: ReactNode;
  addButton?: AddButtonProps;
}

export const SectionCard: FC<BaseCardProps> = ({
  title,
  children,
  addButton,
}) => {
  return (
    <section>
      <header className="flex justify-between items-center mb-4">
        <h2 className="font-bold text-lg lg:text-2xl text-slate-900 dark:text-slate-100">
          {title}
        </h2>

        {addButton && <AddButton path={addButton?.path || "/"} />}
      </header>
      {children}
    </section>
  );
};
