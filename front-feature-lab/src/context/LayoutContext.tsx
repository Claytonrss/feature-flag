import { createContext, useState, ReactNode, useContext } from "react";
import { LayoutType } from "../types";

interface LayoutContextType {
  layout: LayoutType;
  setLayout: (layout: LayoutType) => void;
}

const LayoutContext = createContext<LayoutContextType | undefined>(undefined);

interface LayoutProviderProps {
  children: ReactNode;
  initialLayout: LayoutType;
}

export const LayoutProvider = ({
  children,
  initialLayout,
}: LayoutProviderProps) => {
  const [layout, setLayout] = useState(initialLayout);

  return (
    <LayoutContext.Provider value={{ layout, setLayout }}>
      {children}
    </LayoutContext.Provider>
  );
};

export const useLayout = () => {
  const context = useContext(LayoutContext);
  if (!context) {
    throw new Error("useLayout deve ser usado dentro de um LayoutProvider");
  }
  return context;
};
