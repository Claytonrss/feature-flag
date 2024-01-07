import { Switch } from "@/components/ui/switch";
import { FlagProps } from "./types";

const Flag = ({ flag, handleToggle }: FlagProps) => {
  return (
    <div
      key={flag.id}
      className="flex items-center justify-between gap-4 py-2 first:pt-0 last:pb-0 border-b last:border-b-0"
    >
      <label className="text-lg text-gray-900">{flag.name}</label>
      <Switch
        checked={flag.status === 1}
        onCheckedChange={() => handleToggle(flag)}
      />
    </div>
  );
};

export default Flag;
