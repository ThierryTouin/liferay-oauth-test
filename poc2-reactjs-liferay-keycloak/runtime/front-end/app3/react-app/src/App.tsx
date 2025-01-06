import React, { StrictMode } from 'react';
import { MFEAppContainer, AppProvider, AppConfiguration, ProvidedAppConfiguration, buildAppConfiguration } from 'common-modules';
import Home from './components/Home';


const App: React.FC = () => {

  const appDomain: string = "app3.dev.local";
  const appName: string = "app3";

  const providedConfig: ProvidedAppConfiguration = {
    appId: appName,
    appDomain: appDomain,
    appImagesCompleteUrl: "https://" + appDomain + "/static/js/shared/images",
    appVersion: "1.0.0",
  };

  const appConfig: AppConfiguration = buildAppConfiguration(providedConfig);

  return (

    <StrictMode>
      <AppProvider appConfig={appConfig}>
        <MFEAppContainer>
          <Home/>
        </MFEAppContainer>
      </AppProvider>
    </StrictMode>

  );
}

export default App;
