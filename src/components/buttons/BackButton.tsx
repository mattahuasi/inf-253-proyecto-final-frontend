import { Button } from "@headlessui/react";
import { useNavigate } from "react-router";

export const BackButton = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <Button
      className="hidden md:block font-bold text-white text-md px-6 py-3 rounded-xl shadow border border-blue-500 bg-blue-500 hover:bg-blue-600 transition-all duration-300 ease-in-out"
      onClick={handleBack}
    >
      Volver
    </Button>
  );
};
