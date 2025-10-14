import { Field, Input, Label } from "@headlessui/react";
import { forwardRef } from "react";
import { ErrorInput } from "./ErrorInput";

interface TextInputProps {
  label: string;
  placeholder?: string;
  error?: string;
}

export const NumberInput = forwardRef<HTMLInputElement, TextInputProps>(
  ({ label, placeholder, error, ...props }, ref) => {
    return (
      <Field className="w-full flex flex-col gap-2">
        <Label
          className={`block font-semibold text-sm ${
            !error ? "text-slate-700 dark:text-slate-300" : "text-red-500"
          }`}
        >
          {label}
        </Label>

        <Input
          className={`w-full py-3 text-sm border rounded shadow outline-none focus:ring-2 text-slate-900 dark:text-slate-100 ${
            !error
              ? "bg-slate-100 border-slate-300 dark:bg-slate-700 dark:border-slate-600 focus:ring-blue-500 focus:border-blue-500 placeholder:text-slate-500 dark:placeholder:text-slate-400"
              : "bg-red-100 border-red-300 text-slate-900 dark:text-slate-900 focus:ring-red-500 focus:border-red-500 placeholder:text-red-400"
          } transition-all duration-300 ease-in-out`}
          type="number"
          placeholder={placeholder}
          ref={ref}
          {...props}
        />

        <ErrorInput message={error || ""} />
      </Field>
    );
  }
);
