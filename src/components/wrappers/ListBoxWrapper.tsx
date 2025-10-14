import {
  Field,
  Label,
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/react";
import { Check, ChevronDown } from "lucide-react";
import { Option } from "../../types";

interface ListBoxWrapperProps {
  label: string;
  options: Option[];
  value: Option;
  error?: string;
  disabled?: boolean;
  onChange: (value: Option) => void;
}

export const ListBoxWrapper = ({
  label,
  value,
  options,
  error,
  disabled,
  onChange,
}: ListBoxWrapperProps) => {
  return (
    <Field className="flex flex-col gap-2" disabled={disabled}>
      <Label
        className={`text-sm ${
          !error ? "text-slate-700 dark:text-slate-300" : "text-red-500"
        }`}
      >
        {label}
      </Label>

      <Listbox value={value} onChange={onChange}>
        <ListboxButton
          className={`relative min-w-56 text-left px-6 py-3 text-sm rounded shadow border outline-none ${
            !error
              ? "text-slate-700 dark:text-slate-300  bg-slate-100 dark:bg-slate-700 border-slate-300 dark:border-slate-500 focus:ring-2 focus:border-blue-500"
              : "text-red-500 dark:text-red-500 bg-red-300 border-red-300 dark:border-red-500 focus:ring-2 focus:border-red-500 focus:ring-red-500"
          } transition-all duration-300 ease-in-out `}
        >
          <span className="truncate">{value?.name}</span>
          <ChevronDown className="absolute top-3 right-2.5" size={18} />
        </ListboxButton>

        <ListboxOptions
          className={`w-max mt-1 flex flex-col gap-2 ${
            !error
              ? "bg-slate-100 dark:bg-slate-700"
              : "bg-red-300 border border-red-400"
          } p-2 rounded-lg shadow transition duration-300 ease-in-out`}
          transition
          anchor="bottom"
        >
          {options.map((option) => (
            <ListboxOption
              className={`min-w-52 flex items-center gap-2 text-sm p-3 group ${
                !error
                  ? "text-slate-900 dark:text-slate-100 data-[focus]:bg-blue-500"
                  : "text-red-500 data-[focus]:bg-red-500 data-[focus]:text-red-200"
              } data-[focus]:rounded-lg transition-all duration-300 ease-in-out`}
              key={option?.id?.toString()}
              value={option}
            >
              <Check
                className="invisible group-data-[selected]:visible"
                size={18}
              />
              <span className="truncate">{option.name}</span>
            </ListboxOption>
          ))}
        </ListboxOptions>
      </Listbox>

      <p className="text-red-500 text-sm">{error}</p>
    </Field>
  );
};
