import React, { StrictMode } from 'react';
import { StyledBox, AppProvider, AppConfiguration, ProvidedAppConfiguration, buildAppConfiguration, MFEAppContainer, AppSharedContextParams } from 'common-components';

interface AppSharedProps {
  appSharedContextParams?: AppSharedContextParams;
}

const App: React.FC<AppSharedProps> = ({ appSharedContextParams  }) => {

  const appName: string = "app2";

  const providedConfig: ProvidedAppConfiguration = {
    appId: appName,
    appDomain: "",
    appImagesCompleteUrl: "",
    appVersion: "1.0.0",
    embedded: false,
    signInSilently: false
  };

  const appConfig: AppConfiguration = buildAppConfiguration(providedConfig);

  return (
    <StrictMode>
        <AppProvider appConfig={appConfig}>  
          <StyledBox borderColor="blue" bgColor="#e0f7fa" headerColor="blue" textColor="blue">
            <MFEAppContainer>
              <h2>Hello from APP2</h2>
              <p>I'm defined has a Web Component designed to be used in another application</p>
              {appSharedContextParams && (
                <div>
                  <h3>Context loaded from APP1 using secured shared context :</h3>
                  <ul>
                    <li><strong>First Name:</strong> {appSharedContextParams.firstName}</li>
                    <li><strong>Last Name:</strong> {appSharedContextParams.lastName}</li>
                    <li><strong>Email:</strong> {appSharedContextParams.email}</li>
                    <li><strong>Access Token:</strong> {appSharedContextParams.accessToken}</li>
                  </ul>
                </div>
              )}
            </MFEAppContainer>
          </StyledBox>
        </AppProvider>
    </StrictMode>
  );
};

export default App;