interface ColorProps {
    color: "primary" | "secondary" | "tertiary";
    label: string;
    onClick?: () => void;
  }
  const Button: React.FC<ColorProps> = ({ color, label, onClick }) => {
    const colorClasses = {
      primary: "bg-primary",
      secondary: "bg-secondary",
      tertiary: "bg-tertiary",
    };
    const bgColorClass = colorClasses[color] || "bg-primary"; // Clase predeterminada

    return (
      <button
        className={${bgColorClass} text-white px-4 py-2 rounded-md}
        onClick={onClick}
      >
        {label}
      </button>
    );
  };

  export { Button };
