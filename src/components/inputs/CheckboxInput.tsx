import { Checkbox, Field, Label } from "@headlessui/react";
import { Check } from "lucide-react";

interface CheckboxInputProps {
  label: string;
  checked?: boolean;
  onChange?: (value: boolean) => void;
}

export const CheckboxInput = ({
  label,
  checked,
  onChange,
}: CheckboxInputProps) => {
  return (
    <Field className="flex items-center gap-2">
      <Checkbox
        checked={checked}
        onChange={onChange}
        className={`group block size-4 rounded border shadow bg-slate-100 dark:bg-slate-700 data-[checked]:bg-blue-500 outline-none ${
          checked ? "border-blue-500" : "border-slate-300 dark:border-slate-600"
        }  focus:ring-2 focus:ring-blue-500 focus:ring-offset-0 transition-all duration-300 ease-in-out`}
      >
        <Check
          className="stroke-slate-100 opacity-0 group-data-[checked]:opacity-100"
          size={14}
          strokeWidth={4}
        />
      </Checkbox>
      <Label className="block font-semibold text-sm text-slate-700 dark:text-slate-300">
        {label}
      </Label>
    </Field>
  );
};
