import React, { createContext, useContext, ReactNode } from "react";
import { CoreAppConfig } from '../../models/CoreAppConfig';

// Valeurs par défaut du contexte (pour éviter les erreurs si non initialisé)
const defaultAppContext: CoreAppConfig = {
    appId: "",
    appDomain: "",
    appVersion: "",
    appImagesCompleteUrl: "",
    embeddedMode: false,
};

// Context creation
const AppContext = createContext<CoreAppConfig>(defaultAppContext);

// Context provider
export const AppProvider: React.FC<{ children: ReactNode; appConfig: CoreAppConfig }> = ({
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

// FOR FUTUR USAGE SAMPLE TO REMOVE :
/*import React from "react";
import { useAppContext } from "./AppContext";

const ExampleComponent: React.FC = () => {
  const { appId, appVersion } = useAppContext();

  return (
    <div>
      <p>App ID: {appId}</p>
      <p>Version: {appVersion}</p>
    </div>
  );
};

export default ExampleComponent;*/