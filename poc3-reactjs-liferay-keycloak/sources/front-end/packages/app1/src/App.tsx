import React, { StrictMode } from 'react';
import { CustomOIDCAuthProvider, AppProvider, AppConfiguration, ProvidedAppConfiguration, buildAppConfiguration } from 'common-security';
import AppRouter from './routes/AppRouter';

const App: React.FC = () => {

  const appName: string = "app1";

  const providedConfig: ProvidedAppConfiguration = {
    appId: appName,
    appDomain: "",
    appImagesCompleteUrl: "",
    appVersion: "1.0.0",
  };

  const appConfig: AppConfiguration = buildAppConfiguration(providedConfig);

  return (

    <StrictMode>
      <AppProvider appConfig={appConfig}>
        <CustomOIDCAuthProvider>
            <AppRouter/>
        </CustomOIDCAuthProvider>
      </AppProvider>
    </StrictMode>

  );
}

export default App;
