import React from 'react';
import AppRouter from './routes/AppRouter';
import { AuthProvider } from "react-oidc-context";
import { getAuthConfiguration } from 'common-modules';



const App: React.FC = () => {

  const appId = "app2";
  const authProviderConfig = getAuthConfiguration(appId);

  return (


    <AuthProvider {...authProviderConfig}>
      <h1>AppId:{appId} from POC2</h1>
      <AppRouter appId={appId}/>
    </AuthProvider>
  );
}

export default App;
