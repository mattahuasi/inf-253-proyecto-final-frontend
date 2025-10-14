import { LucideIcon } from "lucide-react";
import { NavLink } from "react-router";

interface NavItemProps {
  path: string;
  Icon: LucideIcon;
  name: string;
  expanded: boolean;
}

export const NavigationLink = ({
  path,
  Icon,
  name,
  expanded,
}: NavItemProps) => {
  return (
    <NavLink to={path} viewTransition>
      {({ isActive }) => (
        <div
          className={`flex ${
            expanded ? "gap-6" : "gap-3"
          } group transition-all duration-300 ease-in-out`}
        >
          <div
            className={`w-2 py-6 rounded-md -ml-1 ${
              isActive ? "bg-blue-500" : "group-hover:bg-blue-500"
            } transition-all duration-300 ease-in-out`}
          ></div>

          <div
            className={`${
              expanded ? "w-full rounded-md px-4 mr-6" : ""
            } flex items-center gap-4 text-slate-900 dark:text-slate-100 text-sm font font-semibold ${
              isActive
                ? `${expanded ? "text-slate-100 bg-blue-500" : "text-blue-500"}`
                : `${
                    expanded
                      ? "hover:text-slate-100 group-hover:bg-blue-500"
                      : "hover:text-blue-500"
                  }`
            } transition-all duration-300 ease-in-out`}
          >
            <Icon
              className={`${
                isActive && `${expanded ? "text-slate-100" : "text-blue-500"}`
              }`}
            />
            <span
              className={`${expanded ? "block" : "hidden"} ${
                isActive && "text-slate-100"
              }`}
            >
              {name}
            </span>
          </div>
        </div>
      )}
    </NavLink>
  );
};
