import { Menu, PanelLeftClose, PanelRightClose } from "lucide-react";
import { FC, useEffect, useState } from "react";
import { ExpandedProps } from "../../types";

interface ToggleButtonProps extends ExpandedProps {
  position: "navbar" | "sidebar";
}

export const ToggleButton: FC<ToggleButtonProps> = ({
  expanded,
  position,
  toggle,
}) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const isNavbar = position === "navbar";
  const isVisible = isMobile ? isNavbar : isNavbar ? expanded : !expanded;

  const Icon = isMobile ? Menu : isNavbar ? PanelLeftClose : PanelRightClose;

  return (
    isVisible && (
      <button
        className={`text-slate-900 dark:text-slate-100 hover:text-blue-500 transition-all duration-300 ease-in-out`}
        onClick={toggle}
      >
        <Icon />
      </button>
    )
  );
};
