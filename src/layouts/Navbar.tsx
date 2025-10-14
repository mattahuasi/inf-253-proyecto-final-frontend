import {
  ChevronDownCircle,
  KeyRound,
  LogOut,
  UserRound,
  UserRoundCog,
} from "lucide-react";
import { FC } from "react";
import { useNavigate } from "react-router";
import { ToggleButton } from "../components/buttons/ToggleBotton";
import { SearchInput } from "../components/inputs/SearchInput";
import { DropdownMenu } from "../components/navigation/DropdownMenu";
import { Avatar } from "../components/ui/Avatar";
import { useAuth } from "../hooks/useAuth";
import { useSearchFilter } from "../hooks/useSearch";
import { ExpandedProps, NavigationLink, NavigationSection } from "../types";

export const Navbar: FC<ExpandedProps> = ({ expanded, toggle, routes }) => {
  const { authUser, handleLogout } = useAuth();
  const navigate = useNavigate();

  const getAllItems = (sections: NavigationSection[]): NavigationLink[] => {
    return sections.flatMap((section) => section.links);
  };
  const items = getAllItems(routes || []);

  const {
    searchText,
    filteredItems,
    handleSearchChange,
    handleItemClick,
    resetSearch,
  } = useSearchFilter({ items });

  return (
    <nav
      className={`w-full lg:w-auto bg-slate-100 dark:bg-slate-800 fixed top-0 right-0 z-10 ${
        expanded ? "lg:left-64" : "lg:left-14"
      } transition-all duration-300 ease-in-out`}
    >
      <div className=" flex items-center justify-between max-h-14 pl-2 lg:pl-4 pr-4 lg:pr-8 py-3">
        <div className="flex items-center gap-4">
          <ToggleButton expanded={expanded} toggle={toggle} position="navbar" />

          <SearchInput
            value={searchText}
            filteredItems={filteredItems}
            onChange={handleSearchChange}
            onClick={handleItemClick}
            onReset={resetSearch}
            expanded={expanded}
          />
        </div>

        <div className="flex items-center gap-4">
          <Avatar />

          <div className="flex justify-between items-center gap-4">
            <div className="hidden md:flex flex-col">
              <h5 className="text-slate-900 dark:text-slate-100 text-sm font-semibold">
                {authUser?.username}
              </h5>
              <p className="text-slate-900 dark:text-slate-100 text-xs">
                {authUser?.role}
              </p>
            </div>

            <DropdownMenu
              header={{
                Icon: UserRound,
                title: authUser?.username || "",
                description: authUser?.role,
              }}
              Icon={ChevronDownCircle}
              items={[
                {
                  label: "Administrar mi cuenta",
                  Icon: UserRoundCog,
                  onClick: () =>
                    navigate("/home/profile", { viewTransition: true }),
                },
                {
                  label: "Cambiar contraseña",
                  Icon: KeyRound,
                  onClick: () =>
                    navigate("/home/change-password", { viewTransition: true }),
                },
                {
                  label: "Cerrar sesión",
                  Icon: LogOut,
                  onClick: () => handleLogout(),
                },
              ]}
            />
          </div>
        </div>
      </div>
    </nav>
  );
};
