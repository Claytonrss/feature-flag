import { ReactNode } from "react";

export interface FeatureFlag {
  id: number;
  name: string;
  status: number;
}

export interface FeatureFlagsState {
  [key: string]: FeatureFlag;
}

export interface FeatureFlagsContextProps {
  flags: FeatureFlagsState;
  setFlag: (name: string, isActive: number) => Promise<void>;
}

export interface FeatureFlagsProviderProps {
  children: ReactNode;
}
