import React, { StrictMode } from 'react';
import { MFEAppContainer, CustomOIDCAuthProvider, AppProvider, AppConfiguration, ProvidedAppConfiguration, buildAppConfiguration } from 'common-components';
import AppRouter from './routes/AppRouter';
import { AppCustomConfig } from './models/AppCustomConfig';

interface AppProps {
  appCustomConfig: AppCustomConfig;
}

const App: React.FC<AppProps> = ({ appCustomConfig }) => {

  const appDomain: string = "app3.dev.local";
  const appName: string = "app3";

  const providedConfig: ProvidedAppConfiguration = {
    appId: appName,
    appDomain: appDomain,
    appImagesCompleteUrl: "https://" + appDomain + "/static/js/shared/images",
    appVersion: "2.0.4",
    embedded: appCustomConfig.embedded,
    signInSilently: appCustomConfig.signInSilently
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
