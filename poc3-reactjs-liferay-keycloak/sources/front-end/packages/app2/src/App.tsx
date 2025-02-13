import React, { StrictMode } from 'react';
import { StyledBox, CustomOIDCAuthProvider, AppProvider, AppConfiguration, ProvidedAppConfiguration, buildAppConfiguration, MFEAppContainer } from 'common-components';

interface AppProps {
  app2ContextParams?: {
    firstName: string;
    lastName: string;
    email: string;
    accessToken: string;
  };
}

const App: React.FC<AppProps> = ({ app2ContextParams }) => {

  const appName: string = "app2";

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
          <StyledBox borderColor="blue" bgColor="#e0f7fa" headerColor="blue" textColor="blue">
            <MFEAppContainer>
              <h2>Hello from APP2</h2>
              <p>I'm defined has a Web Component designed to be used in another application</p>
              {app2ContextParams && (
                <div>
                  <h3>Context loaded from APP1 :</h3>
                  <ul>
                    <li><strong>First Name:</strong> {app2ContextParams.firstName}</li>
                    <li><strong>Last Name:</strong> {app2ContextParams.lastName}</li>
                    <li><strong>Email:</strong> {app2ContextParams.email}</li>
                    <li><strong>Access Token:</strong> {app2ContextParams.accessToken}</li>
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