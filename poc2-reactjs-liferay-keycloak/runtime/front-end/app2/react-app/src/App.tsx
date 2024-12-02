import React from 'react';
import AppRouter from './routes/AppRouter';
import { AuthProvider } from "react-oidc-context";
import { AuthProviderConfig } from 'common-modules';



const App: React.FC = () => {
  return (
    <AuthProvider {...AuthProviderConfig}>
      <AppRouter />
    </AuthProvider>
  );
}

export default App;
