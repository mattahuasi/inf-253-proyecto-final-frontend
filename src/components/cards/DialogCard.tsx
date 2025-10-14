import {
  Button,
  Description,
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { X } from "lucide-react";
import { FC, ReactNode } from "react";
import { CancelButton } from "../buttons/CancelButton";

interface DialogCardProps {
  title: string;
  description?: string;
  children?: ReactNode;
  open: boolean;
  extraButton?: ReactNode;
  cancel?: boolean;
  onClose: () => void;
}

export const DialogCard: FC<DialogCardProps> = ({
  title,
  description,
  children,
  open,
  extraButton,
  cancel = true,
  onClose,
}) => {
  return (
    <>
      <Dialog open={open} onClose={onClose} className="relative z-50">
        <DialogBackdrop className="fixed inset-0 bg-slate-800 bg-opacity-50" />

        <div className="fixed inset-0 md:flex items-center justify-center p-4 overflow-y-auto">
          <DialogPanel className="w-full md:w-fit space-y-4 border text-slate-900 dark:text-slate-100 border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 rounded-xl p-4 lg:p-8">
            <div className="relative">
              <DialogTitle className="font-bold text-xl">{title}</DialogTitle>

              <Button
                className="absolute -top-2 lg:-top-6 -right-2 lg:-right-6 hover:text-red-500"
                onClick={onClose}
              >
                <X />
              </Button>
            </div>

            {description && (
              <Description className="text-lg">{description}</Description>
            )}

            <div>{children}</div>

            <div className="flex justify-around items-center gap-4">
              {cancel && <CancelButton onClick={onClose} />}

              {extraButton && extraButton}
            </div>
          </DialogPanel>
        </div>
      </Dialog>
    </>
  );
};
