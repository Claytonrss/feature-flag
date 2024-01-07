import {
  fetchFeatureFlags,
  updateFeatureFlag,
} from "@/services/FeatureFlagService";
import React, { createContext, useEffect, useState } from "react";
import { FeatureFlag, FeatureFlagsContextProps, FeatureFlagsProviderProps, FeatureFlagsState } from "./types";

export const FeatureFlagsContext = createContext<FeatureFlagsContextProps>(
  {} as FeatureFlagsContextProps
);

export const FeatureFlagsProvider: React.FC<FeatureFlagsProviderProps> = ({
  children,
}) => {
  const [flags, setFlags] = useState<FeatureFlagsState>({});

  useEffect(() => {
    const initializeFlags = async () => {
      const fetchedFlags: FeatureFlag[] = await fetchFeatureFlags();
      const flagsState = fetchedFlags.reduce((acc, flag) => {
        acc[flag.name] = flag;
        return acc;
      }, {} as FeatureFlagsState);
      setFlags(flagsState);
    };

    initializeFlags();
  }, []);

  const setFlag = async (name: string, status: number) => {
    await updateFeatureFlag(name, status);
    setFlags((prev) => ({ ...prev, [name]: { ...prev[name], status } }));
  };

  return (
    <FeatureFlagsContext.Provider value={{ flags, setFlag }}>
      {children}
    </FeatureFlagsContext.Provider>
  );
};
