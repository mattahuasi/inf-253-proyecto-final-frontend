import { LogOut } from "lucide-react";
import { FC } from "react";
import { Link } from "react-router";
import { ToggleButton } from "../components/buttons/ToggleBotton";
import { NavigationLink } from "../components/navigation/NavigationLink";
import { useAuth } from "../hooks/useAuth";
import { ExpandedProps } from "../types";

export const Sidebar: FC<ExpandedProps> = ({ expanded, toggle, routes }) => {
  const { handleLogout } = useAuth();

  return (
    <aside
      className={`flex flex-col bg-slate-100 dark:bg-slate-800 h-screen fixed top-0 left-0 z-50 transform overflow-y-auto ${
        expanded
          ? "translate-x-0 w-64"
          : "-translate-x-full lg:translate-x-0 lg:w-14"
      } transition-all duration-300 ease-in-out`}
    >
      <header className="flex justify-center items-center py-4">
        <Link
          className={expanded ? "block" : "hidden"}
          to="/home/dashboard"
          viewTransition
        >
          <h2 className="font-extrabold text-xl">
            <span className="text-blue-500">Betto's</span>
            <span className="text-slate-900 dark:text-slate-100">Food</span>
          </h2>
        </Link>

        <ToggleButton expanded={expanded} toggle={toggle} position="sidebar" />
      </header>

      <nav className="mt-4 flex-1 flex flex-col justify-between">
        <div>
          {routes?.map((route, index) => (
            <div className="mb-2" key={index}>
              <h2
                className={`text-slate-900 opacity-65 ml-10 mb-2 ${
                  expanded ? "block" : "hidden"
                } dark:text-slate-100 text-xs font-semibold uppercase`}
              >
                {route.title}
              </h2>
              <ul className="flex flex-col gap-1 mb-1">
                {route.links.map((route, index) => (
                  <li key={index}>
                    <NavigationLink
                      path={route.path}
                      Icon={route.icon}
                      name={route.name}
                      expanded={expanded}
                    />
                  </li>
                ))}
              </ul>

              <div
                className={`border-t border-slate-200 dark:border-slate-700 w-full ${
                  routes.length - 1 === index ? "hidden" : ""
                }`}
              ></div>
            </div>
          ))}
        </div>

        <div className="border-t border-slate-200 dark:border-slate-700 py-2">
          <button className="block w-full outline-none" onClick={handleLogout}>
            <div
              className={`flex ${
                expanded ? "gap-6" : "gap-3"
              } group transition-all duration-300 ease-in-out`}
            >
              <div
                className={`w-2 py-6 rounded-md -ml-1 group-hover:bg-red-500 transition-all duration-300 ease-in-out`}
              ></div>
              <div
                className={`${
                  expanded
                    ? "w-full rounded-md px-4 mr-6 hover:text-slate-100 group-hover:bg-red-500"
                    : "hover:text-red-500"
                } flex items-center gap-4 text-slate-900 dark:text-slate-100 text-sm font font-semibold transition-all duration-300 ease-in-out`}
              >
                <LogOut className="text-2xl" />
                <span className={expanded ? "block" : "hidden"}>
                  Cerrar sesión
                </span>
              </div>
            </div>
          </button>
        </div>
      </nav>
    </aside>
  );
};
