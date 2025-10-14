import { ChangeEvent, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";
import { NavigationLink } from "../types";

interface SearchProps {
  items: NavigationLink[];
}

export const useSearchFilter = ({ items }: SearchProps) => {
  const [searchText, setSearchText] = useState<string>("");
  const [filteredItems, setFilteredItems] = useState<NavigationLink[]>(items);
  const navigate = useNavigate();

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchText(value);

    const filtered = items.filter((item) =>
      item.name.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredItems(filtered);
  };

  const handleItemClick = (path: string) => {
    navigate(path);
  };
  const resetSearch = () => {
    setSearchText("");
    setFilteredItems(items);
  };

  return {
    searchText,
    filteredItems,
    handleSearchChange,
    handleItemClick,
    resetSearch,
  };
};

export const useSearchReset = ({ onReset }: { onReset: () => void }) => {
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        onReset();
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [onReset]);

  return { searchRef };
};
