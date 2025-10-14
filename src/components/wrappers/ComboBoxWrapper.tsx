import {
  Combobox,
  ComboboxButton,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
  Field,
  Label,
} from "@headlessui/react";
import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { Option } from "../../types";

interface ComboboxWrapperProps {
  label: string;
  options: Option[];
  value: Option;
  error?: string;
  disabled?: boolean;
  onChange: (value: Option) => void;
}

export const ComboboxWrapper = ({
  label,
  options,
  value,
  error,
  disabled,
  onChange,
}: ComboboxWrapperProps) => {
  const [query, setQuery] = useState("");

  const filteredOptions =
    query === ""
      ? options
      : options.filter((option) => {
          return option.name?.toLowerCase().includes(query.toLowerCase());
        });
  return (
    <Field className="w-full flex flex-col gap-2" disabled={disabled}>
      <Label
        className={`text-sm ${
          !error ? "text-slate-700 dark:text-slate-300" : "text-red-500"
        }`}
      >
        {label}
      </Label>

      <Combobox value={value} onChange={onChange} onClose={() => setQuery("")}>
        <div className="relative flex gap-2">
          <ComboboxInput
            className={`w-full min-w-56 px-6 py-3 text-sm rounded shadow border outline-none ${
              !error
                ? "text-slate-700 dark:text-slate-300  bg-slate-100 dark:bg-slate-700 border-slate-300 dark:border-slate-500 focus:ring-2 focus:border-blue-500"
                : "text-red-500 dark:text-red-500 bg-red-300 border-red-300 dark:border-red-500 focus:ring-2 focus:border-red-500 focus:ring-red-500"
            } transition-all duration-300 ease-in-out `}
            displayValue={() => value?.name || ""}
            onChange={(event) => setQuery(event.target.value)}
          />

          <ComboboxButton
            className={`group absolute inset-y-0 right-0 px-2.5 ${
              !error ? "text-slate-700 dark:text-slate-300" : "text-red-500"
            }`}
          >
            <ChevronDown size={18} />
          </ComboboxButton>
        </div>
        <ComboboxOptions
          className={`w-max mt-1 flex flex-col gap-2 ${
            !error
              ? "bg-slate-100 dark:bg-slate-700"
              : "bg-red-300 border border-red-400"
          } p-2 rounded-lg shadow transition duration-300 ease-in-out`}
          transition
          anchor="bottom"
        >
          {filteredOptions.map((option) => (
            <ComboboxOption
              className={`min-w-52 flex items-center gap-2 text-sm p-3 group ${
                !error
                  ? "text-slate-900 dark:text-slate-100 data-[focus]:bg-blue-500"
                  : "text-red-500 data-[focus]:bg-red-500 data-[focus]:text-red-200"
              } data-[focus]:rounded-lg transition-all duration-300 ease-in-out`}
              key={option.id?.toString()}
              value={option}
            >
              {option.name}
            </ComboboxOption>
          ))}
        </ComboboxOptions>
      </Combobox>

      <p className="text-red-500 text-sm">{error}</p>
    </Field>
  );
};
