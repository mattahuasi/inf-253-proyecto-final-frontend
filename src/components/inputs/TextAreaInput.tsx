import { Description, Field, Label, Textarea } from "@headlessui/react";
import { ChangeEvent, FC } from "react";
import { ErrorInput } from "./ErrorInput";

interface TextAreaInputProps {
  label: string;
  value: string;
  error?: string;
  disabled?: boolean;
  onChange?: (e: ChangeEvent<HTMLTextAreaElement>) => void;
}

export const TextAreaInput: FC<TextAreaInputProps> = ({
  label,
  value,
  error,
  disabled,
  onChange,
}) => {
  return (
    <Field className="w-full flex flex-col gap-2" disabled={disabled}>
      <Label
        className={`block font-semibold text-sm ${
          !error ? "text-slate-700 dark:text-slate-300" : "text-red-500"
        }`}
      >
        {label}
      </Label>

      <Description
        className={`-mt-2 block font-semibold text-xs ${
          !error ? "text-slate-600 dark:text-slate-400" : "text-red-500"
        }`}
      >
        Escribe una breve descripción
      </Description>

      <Textarea
        as="textarea"
        value={value}
        onChange={onChange}
        className={`w-full py-3 text-sm border rounded shadow outline-none focus:ring-2 text-slate-900 dark:text-slate-100 ${
          !error
            ? "bg-slate-100 border-slate-300 dark:bg-slate-700 dark:border-slate-600 focus:ring-blue-500 focus:border-blue-500 placeholder:text-slate-500 dark:placeholder:text-slate-400"
            : "bg-red-100 border-red-300 text-slate-900 dark:text-slate-900 focus:ring-red-500 focus:border-red-500 placeholder:text-red-400"
        } transition-all duration-300 ease-in-out`}
        rows={5}
      />

      <ErrorInput message={error || ""} />
    </Field>
  );
};
