import React, { StrictMode } from 'react';
import { AuthProvider } from "react-oidc-context";
import { getAuthConfiguration } from 'common-modules';
import AppRouter from './routes/AppRouter';



const App: React.FC = () => {

  const appId = "app1";
  const authProviderConfig = getAuthConfiguration(appId);

  return (

    <StrictMode>
      <AuthProvider {...authProviderConfig}>
        <h1>AppId:{appId} from POC2 : Externalized libraries version</h1>
        <AppRouter appId={appId}/>
      </AuthProvider>
    </StrictMode>

  );
}

export default App;
