import React, { StrictMode } from 'react';
import AppRouter from './routes/AppRouter';
import { AuthProvider } from "react-oidc-context";
import { getAuthConfiguration, MFEAppContainer } from 'common-modules';

const App: React.FC = () => {

  const appId = "app2";
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
