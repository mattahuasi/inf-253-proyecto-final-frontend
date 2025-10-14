import { UserRound } from "lucide-react";

export const Avatar = () => {
  return (
    <div className="w-10 h-10 flex justify-center items-center rounded-full bg-slate-200 dark:bg-slate-700 text-gray-800 dark:text-gray-200">
      <UserRound />
    </div>
  );
};
