import { Field, Input, Label } from "@headlessui/react";
import {
  ChangeEvent,
  FC,
  forwardRef,
  InputHTMLAttributes,
  useState,
} from "react";
import { PhotoProvider, PhotoView } from "react-photo-view";
import { ErrorInput } from "./ErrorInput";

interface ImageInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export const ImageInput: FC<ImageInputProps> = forwardRef<
  HTMLInputElement,
  ImageInputProps
>(({ label, error, onChange, ...props }, ref) => {
  const [preview, setPreview] = useState<string | null>(null);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }

    if (onChange) {
      onChange(event);
    }
  };
  return (
    <Field className="w-full flex flex-col gap-2">
      {preview && (
        <PhotoProvider>
          <div className="max-h-52 max-w-52 mx-auto cursor-zoom-in">
            <PhotoView src={preview}>
              <img
                className="object-cover object-center"
                src={preview}
                alt="preview"
              />
            </PhotoView>
          </div>
        </PhotoProvider>
      )}

      <Label
        className={`block font-semibold text-sm ${
          !error ? "text-slate-700 dark:text-slate-300" : "text-red-500"
        }`}
      >
        {label}
      </Label>

      <Input
        className={`w-full file:py-3 text-sm border rounded shadow outline-none focus:ring-2 text-slate-700 dark:text-slate-400 ${
          !error
            ? "bg-slate-100 border-slate-300 dark:bg-slate-700 dark:border-slate-600 focus:ring-blue-500 focus:border-blue-500 placeholder:text-slate-500 dark:placeholder:text-slate-400 focus:outline-none"
            : "bg-red-300 border-red-500 text-red-500 dark:text-red-900 focus:ring-red-500 focus:border-red-500 placeholder:text-red-400 focus:outline-none file:bg-slate-300 dark:file:bg-red-600 file:text-red-500 dark:file:text-red-300"
        } file:border-none file:mr-2 file:bg-slate-300 dark:file:bg-slate-600 file:text-slate-500 dark:file:text-slate-300 transition-all duration-300 ease-in-out`}
        type="file"
        accept="image/*"
        ref={ref}
        onChange={handleFileChange}
        {...props}
      />
      <ErrorInput message={error || ""} />
    </Field>
  );
});
