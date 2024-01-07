import { useContext } from "react";
import { FeatureFlagsContext } from "@/context/FeatureFlagsContext";
import { FeatureFlag } from "./types";
import Flag from "../Flag";

const FlagSwitcher = () => {
  const { flags, setFlag } = useContext(FeatureFlagsContext);

  const handleToggle = async (flag: FeatureFlag) => {
    const newStatus = flag.status === 1 ? 0 : 1;
    await setFlag(flag.name, newStatus);
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md max-w-md mx-auto">
      {Object.values(flags).map((flag: FeatureFlag) => (
        <Flag key={flag.id} flag={flag} handleToggle={handleToggle} />
      ))}
    </div>
  );
};

export default FlagSwitcher;
