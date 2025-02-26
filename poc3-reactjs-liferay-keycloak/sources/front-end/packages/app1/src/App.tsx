import React, { StrictMode } from 'react';
import { CustomOIDCAuthProvider, AppProvider, AppConfiguration, ProvidedAppConfiguration, buildAppConfiguration, MFEAppContainer } from 'common-components';
import AppRouter from './routes/AppRouter';
import { StyledBox, AppSharedProvider } from "common-components";

const App: React.FC = () => {

  const appName: string = "app1";

  const providedConfig: ProvidedAppConfiguration = {
    appId: appName,
    appDomain: "",
    appImagesCompleteUrl: "",
    appVersion: "1.0.11",
    embedded: false,
    signInSilently: false
  };

  const appConfig: AppConfiguration = buildAppConfiguration(providedConfig);

  return (

    <StrictMode>
      <AppSharedProvider>
        <AppProvider appConfig={appConfig}>  
            <CustomOIDCAuthProvider>
              <StyledBox 
                    borderColor="darkred" 
                    bgColor="#f8d7da" 
                    headerColor="darkred" 
                    textColor="darkred"
              >
                <MFEAppContainer>
                  <AppRouter/>     
                </MFEAppContainer>
              </StyledBox>
            </CustomOIDCAuthProvider>
        </AppProvider>
      </AppSharedProvider>
    </StrictMode>
  );
}

export default App;
