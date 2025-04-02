import React, { StrictMode } from 'react';
import { MFEAppContainer, CustomOIDCAuthProvider, AppProvider, AppConfiguration, ProvidedAppConfiguration, buildAppConfiguration, StyledBox } from 'common-components';
import AppRouter from './routes/AppRouter';
import { App3CustomConfig } from './models/App3CustomConfig';

interface AppProps {
  appCustomConfig: App3CustomConfig;
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
    signInSilently: appCustomConfig.signInSilently,
  };

  const appConfig: AppConfiguration = buildAppConfiguration(providedConfig, appCustomConfig);

  return (

    <StrictMode>
      <AppProvider appConfig={appConfig}>
        <CustomOIDCAuthProvider>
          <StyledBox 
                      borderColor="green" 
                      bgColor="#adf196" 
                      headerColor="green" 
                      textColor="green"
          >
            <MFEAppContainer>
              <AppRouter/>
            </MFEAppContainer>
          </StyledBox>
        </CustomOIDCAuthProvider>
      </AppProvider>
    </StrictMode>

  );
}

export default App;
