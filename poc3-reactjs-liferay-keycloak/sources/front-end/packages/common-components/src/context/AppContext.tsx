import React, { createContext, useContext, ReactNode } from "react";
import { AppConfiguration } from '../models/AppConfiguration';

// Context creation
const AppContext = createContext<AppConfiguration | null>(null);

// Context provider
export const AppProvider: React.FC<{ children: ReactNode; appConfig: AppConfiguration }> = ({
    children,
    appConfig,
}) => {
    return <AppContext.Provider value={appConfig}>{children}</AppContext.Provider>;
};

// Contex hook definition
export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};