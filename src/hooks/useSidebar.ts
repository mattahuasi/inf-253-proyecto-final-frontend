import { useEffect, useState } from "react";

const BREAKPOINT = 1024;
const WINDOW_WIDTH = window.innerWidth;

export const useSidebar = () => {
  const [expanded, setExpanded] = useState<boolean>(
    WINDOW_WIDTH > BREAKPOINT ? true : false
  );

  useEffect(() => {
    const handleResize = () => {
      if (WINDOW_WIDTH > BREAKPOINT && !expanded) {
        setExpanded(true);
      } else if (WINDOW_WIDTH <= BREAKPOINT && expanded) {
        setExpanded(false);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, [expanded]);

  const toggle = () => setExpanded(!expanded);
  const touch = () => setExpanded(false);

  return { expanded, toggle, touch };
};
