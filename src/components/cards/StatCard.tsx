import { LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  counter: string;
  Icon: LucideIcon;
  iconColor: string;
}

export const StatCard = ({
  title,
  counter,
  Icon,
  iconColor,
}: StatCardProps) => {
  return (
    <article className="w-full flex flex-col gap-7 px-4 py-6 bg-slate-100 dark:bg-slate-800 rounded-md shadow">
      <div className="flex justify-between gap-4">
        <div className="flex flex-col gap-4">
          <h3 className="font-semibold text-sm text-slate-900 dark:text-slate-400 opacity-70">
            {title}
          </h3>
          <p className="font-bold text-2xl text-slate-900 dark:text-slate-100">
            {counter}
          </p>
        </div>
        <div
          className={`w-14 h-14 flex justify-center items-center text-3xl rounded-3xl`}
          style={{
            color: iconColor,
            backgroundColor: iconColor + "36",
          }}
        >
          <Icon />
        </div>
      </div>
    </article>
  );
};
