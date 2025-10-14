import { FC, FormEvent, ReactNode } from "react";
import { CancelButton } from "../buttons/CancelButton";
import { DeleteButton } from "../buttons/DeleteButton";
import { DialogCard } from "./DialogCard";

interface DeleteCardProps<T = unknown> {
  title: string;
  open: boolean;
  children?: ReactNode;
  handleDelete: () => Promise<T>;

  onClose: () => void;
}

export const DeleteCard: FC<DeleteCardProps> = ({
  title,
  open,
  children,
  handleDelete,
  onClose,
}) => {
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await handleDelete();
  };

  return (
    <DialogCard
      title={title}
      description="¿Estás seguro de que quieres eliminar esta fila?"
      open={open}
      cancel={false}
      onClose={onClose}
    >
      <form onSubmit={handleSubmit}>
        {children}

        <div className="flex justify-around items-center gap-4">
          <CancelButton onClick={onClose} />
          <DeleteButton />
        </div>
      </form>
    </DialogCard>
  );
};
