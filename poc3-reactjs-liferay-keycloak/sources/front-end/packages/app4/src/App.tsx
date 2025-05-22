import React, { StrictMode } from 'react';
import { StyledBox, AppProvider, AppConfiguration, ProvidedAppConfiguration, buildAppConfiguration, MFEAppContainer, AppSharedContextParams } from 'common-components';

interface AppSharedProps {
  appSharedContextParams?: AppSharedContextParams;
}

const App: React.FC<AppSharedProps> = ({ appSharedContextParams  }) => {

  const appName: string = "app4";

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
        <StyledBox borderColor="orange" bgColor="#fff3cd" headerColor="orange" textColor="orange">
            <MFEAppContainer>
            <h3>APP 04 Description</h3>
            <ul>
              <li>
                <b>AUTHENTICATION: none this app is public</b>
              </li>
              <li>
                <b>INTEGRATION :</b>
                <ul>
                  <li>Defined as web component</li>
                  <li>This application is deployed <b>in separate resource server hosted outside of Liferay</b> portal with <b>limited adherence</b> with Liferay.</li> 
                  <li>This application <b>is not integrated in Liferay using js-map feature</b></li>
                </ul>
              </li>
              <li>
                <b>MISCELLANEOUS :</b>
                <ul>
                  <li>This app leverage a <b>centralized and shared react library</b> to centralize common devs or libraries.</li>
                </ul>
              </li>         
            </ul>
            </MFEAppContainer>
          </StyledBox>
        </AppProvider>
    </StrictMode>
  );
};

export default App;