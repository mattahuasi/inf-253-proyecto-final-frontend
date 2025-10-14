import {
  Button,
  Menu,
  MenuButton,
  MenuHeading,
  MenuItem,
  MenuItems,
  MenuSection,
  MenuSeparator,
} from "@headlessui/react";
import { LucideIcon } from "lucide-react";
import { FC, Fragment } from "react";

interface DropdownMenuHeader {
  Icon: LucideIcon;
  title: string;
  description?: string;
}

export interface DropdownMenuItem {
  label: string;
  Icon: LucideIcon;
  onClick: () => void;
}

interface DropdownMenuProps {
  Icon: LucideIcon;
  header?: DropdownMenuHeader;
  items: DropdownMenuItem[];
}

export const DropdownMenu: FC<DropdownMenuProps> = ({
  Icon,
  header,
  items,
}) => {
  return (
    <Menu>
      <MenuButton as={Fragment}>
        <Button className="text-slate-900 dark:text-slate-100">
          <Icon />
        </Button>
      </MenuButton>

      <MenuItems
        className="max-w-52 border z-20 border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 p-2 rounded-xl origin-top transition duration-200 ease-out data-[closed]:scale-95 data-[closed]:opacity-0"
        transition
        anchor="bottom end"
      >
        <MenuSection className="md:hidden">
          {header && (
            <>
              <MenuHeading className="flex justify-center items-center gap-2 text-slate-900 dark:text-slate-100">
                <header.Icon size={32} />
                <article>
                  <h4 className="text-sm font-medium ">{header.title}</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {header.description}
                  </p>
                </article>
              </MenuHeading>

              <MenuSeparator className="h-px bg-slate-200 -mx-2 my-1 dark:bg-slate-700" />
            </>
          )}
        </MenuSection>

        <MenuSection>
          {items.map((item, index) => (
            <div className="relative flex flex-col group" key={index}>
              <div className="absolute w-1.5 h-9 rounded-md top-0 -left-3 group-hover:bg-blue-500 transition-all duration-300 ease-in-out"></div>

              <MenuItem as={Fragment}>
                <Button
                  className="relative w-full flex items-center gap-2 px-4 py-2 text-sm text-slate-900 dark:text-slate-100 data-[focus]:bg-blue-500 data-[focus]:text-slate-100 data-[focus]:rounded-lg transition-all duration-300 ease-in-out"
                  onClick={item.onClick}
                >
                  <item.Icon size={18} />
                  <span className="truncate">{item.label}</span>
                </Button>
              </MenuItem>

              {items.length !== index + 1 && (
                <MenuSeparator className="h-px bg-slate-200 -mx-2 my-1 dark:bg-slate-700" />
              )}
            </div>
          ))}
        </MenuSection>
      </MenuItems>
    </Menu>
  );
};
