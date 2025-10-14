import { Outlet } from "react-router";

export const AuthLayout = () => {
  return (
    <main className="h-screen flex justify-center items-center bg-blue-500 dark:bg-slate-900 px-5">
      <Outlet />
    </main>
  );
};
