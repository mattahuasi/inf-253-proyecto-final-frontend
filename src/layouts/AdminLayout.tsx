import { Outlet } from "react-router";
import { useSidebar } from "../hooks/useSidebar";
import { routes } from "../routes/SidebarRoutes";
import { Navbar } from "./Navbar";
import { Sidebar } from "./Sidebar";

export const AdminLayout = () => {
  const { expanded, toggle, touch } = useSidebar();

  return (
    <>
      <Navbar expanded={expanded} toggle={toggle} routes={routes} />
      <Sidebar expanded={expanded} toggle={toggle} routes={routes} />

      {expanded && (
        <div
          className="fixed inset-0 bg-slate-900 bg-opacity-70 lg:hidden z-40"
          onClick={touch}
        />
      )}

      <main
        className={`min-h-screen bg-slate-200 dark:bg-slate-900 mt-14 p-4 ${
          expanded ? "lg:ml-64" : "lg:ml-14"
        } transition-all duration-300 ease-in-out`}
      >
        <Outlet />
      </main>
    </>
  );
};
