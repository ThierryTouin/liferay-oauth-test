import React, { StrictMode } from 'react';
import { MFEAppContainer, CustomOIDCAuthProvider, AppProvider, AppConfiguration, ProvidedAppConfiguration, buildAppConfiguration } from 'common-modules';
import AppRouter from './routes/AppRouter';

const App: React.FC = () => {

  const appDomain: string = "app1.dev.local";
  const appName: string = "app1";

  const providedConfig: ProvidedAppConfiguration = {
    appId: appName,
    appDomain: appDomain,
    appImagesCompleteUrl: "https://" + appDomain + "/static/js/shared/images",
    appVersion: "2.0.3",
  };

  const appConfig: AppConfiguration = buildAppConfiguration(providedConfig);

  return (

    <StrictMode>
      <AppProvider appConfig={appConfig}>
        <CustomOIDCAuthProvider appId={appConfig.appId}>
          <MFEAppContainer appId={appConfig.appId} titleText={appConfig.appVersion} imageUrl={appConfig.appImagesCompleteUrl}>
            <AppRouter appId={appConfig.appId}/>
          </MFEAppContainer>
        </CustomOIDCAuthProvider>
      </AppProvider>
    </StrictMode>

  );
}

export default App;
