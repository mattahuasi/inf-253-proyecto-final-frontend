import { Search } from "lucide-react";
import { ChangeEvent, FC } from "react";
import { useSearchReset } from "../../hooks/useSearch";
import { NavigationLink } from "../../types";

interface SearchInputProps {
  value: string;
  filteredItems: NavigationLink[];
  expanded: boolean;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onClick: (path: string) => void;
  onReset: () => void;
}

export const SearchInput: FC<SearchInputProps> = ({
  value,
  filteredItems,
  expanded,
  onChange,
  onClick,
  onReset,
}) => {
  const { searchRef } = useSearchReset({ onReset });

  return (
    <div ref={searchRef}>
      <div className="relative">
        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
          <Search
            className="absolute text-slate-400 dark:text-slate-200"
            size={16}
          />
        </div>
        <input
          className="block w-full md:w-72 lg:w-80 text-sm text-slate-800 dark:text-slate-200 bg-slate-200 dark:bg-slate-700 rounded-3xl py-2 ps-10 border-none ring-1 ring-slate-300 dark:ring-slate-600 placeholder:text-slate-400 placeholder:text-sm dark:placeholder:text-slate-200 outline-none hover:ring-blue-500 hover:ring-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 ease-in-out"
          type="search"
          name="Search"
          placeholder="Buscar"
          id="search"
          value={value}
          onChange={onChange}
        />
      </div>

      {value && (
        <ul
          className={`absolute w-40 lg:w-72 top-12 ${
            expanded ? "lg:left-20" : "left-16 lg:left-8"
          } p-2 flex flex-col gap-1 text-slate-900 dark:text-slate-100 bg-slate-100 dark:bg-slate-800 rounded-lg shadow`}
        >
          {filteredItems.length === 0 ? (
            <li className="px-4 py-2 text-slate-900 dark:text-slate-100 rounded-md transition-all duration-300 ease-in-out z-40 truncate">
              No se encontró coincidencias
            </li>
          ) : (
            filteredItems.map((item) => (
              <li
                className="px-4 py-2 cursor-pointer text-sm text-slate-900 dark:text-slate-100 hover:bg-blue-500 hover:text-slate-100 rounded-md truncate transition-all duration-300 ease-in-out"
                key={item.name}
                onClick={() => onClick(item.path)}
              >
                {item.name}
              </li>
            ))
          )}
        </ul>
      )}
    </div>
  );
};
