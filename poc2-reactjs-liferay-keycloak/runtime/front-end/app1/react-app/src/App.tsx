import React, { StrictMode } from 'react';
import { AuthProvider } from "react-oidc-context";
import { getAuthConfiguration, MFEAppContainer } from 'common-modules';
import AppRouter from './routes/AppRouter';



const App: React.FC = () => {

  const appId = "app1";
  const authProviderConfig = getAuthConfiguration(appId);
  const titleVersion = " version 2.0.1";

  return (

    <StrictMode>
      <AuthProvider {...authProviderConfig}>
        <MFEAppContainer appId={appId} titleText={titleVersion}>
          <AppRouter appId={appId}/>
        </MFEAppContainer>
      </AuthProvider>
    </StrictMode>

  );
}

export default App;
