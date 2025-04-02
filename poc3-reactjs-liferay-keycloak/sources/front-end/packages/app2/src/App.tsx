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
            <h3>APP 02 Description</h3>
            <ul>
              <li>
                <b>AUTHENTICATION: none this app is public</b>
              </li>
              <li>
                <b>INTEGRATION :</b>
                <ul>
                  <li>Defined as web component</li>
                  <li>This application is deployed <b>in separate resource server hosted outside of Liferay</b> portal with <b>limited adherence</b> with Liferay.</li> 
                  <li>This application <b>is not integrated in Liferay because of it's inclusion inside APP1</b></li>
                </ul>
              </li>
              <li>
                <b>MISCELLANEOUS :</b>
                <ul>
                  <li>This app leverage a <b>centralized and shared react library</b> to centralize common devs or libraries.</li>
                </ul>
              </li>         
            </ul>
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