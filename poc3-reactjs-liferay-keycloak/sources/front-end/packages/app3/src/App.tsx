import React, { StrictMode } from 'react';
import AppRouter from './routes/AppRouter';
import { MFEAppContainer } from "./components/MFEAppContainer";
import CustomOIDCAuthProvider from "./components/CustomOIDCAuthProvider";
import { StyledBox } from "./components/StyledBox";
import { buildAppConfiguration } from './services/configService';
import { AppConfiguration } from './models/AppConfiguration';
import { ProvidedAppConfiguration } from './models/ProvidedAppConfiguration';
import { AppProvider } from './components/context/AppContext';

const App: React.FC = () => {

  const appName: string = "app3";

  const providedConfig: ProvidedAppConfiguration = {
    appId: appName,
    appDomain: "",
    appImagesCompleteUrl: "",
    appVersion: "1.0.6",
  };

  const appConfig: AppConfiguration = buildAppConfiguration(providedConfig);

  return (

    <StrictMode>
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
    </StrictMode>
  );
}

export default App;
