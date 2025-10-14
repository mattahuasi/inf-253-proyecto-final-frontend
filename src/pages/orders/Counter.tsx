import { OnClickButton } from "../../components/buttons/OnClickButton";

interface CounterProps {
  count: number;
  onIncrease: () => void;
  onDecrease: () => void;
}

const Counter: React.FC<CounterProps> = ({ count, onIncrease, onDecrease }) => {
  return (
    <div className="flex items-center gap-4 mt-4">
      <OnClickButton label="-" onClick={onDecrease} />
      <p className="text-lg font-semibold">{count}</p>
      <OnClickButton label="+" onClick={onIncrease} />
    </div>
  );
};

export { Counter };
