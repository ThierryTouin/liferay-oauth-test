import React, { StrictMode } from 'react';
import { MFEAppContainer, CustomOIDCAuthProvider, AppProvider, AppConfiguration, ProvidedAppConfiguration, buildAppConfiguration } from 'common-modules';
import AppRouter from './routes/AppRouter';


const App: React.FC = () => {

  const appDomain: string = "app2.dev.local";
  const appName: string = "app2";

  const providedConfig: ProvidedAppConfiguration = {
    appId: appName,
    appDomain: appDomain,
    appImagesCompleteUrl: "https://" + appDomain + "/static/js/shared/images",
    appVersion: "2.0.5",
  };

  const appConfig: AppConfiguration = buildAppConfiguration(providedConfig);

  return (

    <StrictMode>
      <AppProvider appConfig={appConfig}>
        <CustomOIDCAuthProvider>
          <MFEAppContainer>
            <AppRouter/>
          </MFEAppContainer>
        </CustomOIDCAuthProvider>
      </AppProvider>
    </StrictMode>

  );
}

export default App;
