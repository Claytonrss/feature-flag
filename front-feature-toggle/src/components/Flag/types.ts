import { FeatureFlag } from "@/components/FlagSwitcher/types";

export interface FlagProps {
    flag: FeatureFlag;
    handleToggle: (flag: FeatureFlag) => void;
  }