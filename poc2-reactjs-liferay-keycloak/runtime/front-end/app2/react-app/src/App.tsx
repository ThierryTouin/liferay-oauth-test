import React, { StrictMode } from 'react';
import AppRouter from './routes/AppRouter';
import { MFEAppContainer, CustomOIDCAuthProvider } from 'common-modules';

const App: React.FC = () => {

  const appId = "app2";
  const titleVersion = " version 2.0.2";

  return (

    <StrictMode>
      <CustomOIDCAuthProvider appId={appId}>
        <MFEAppContainer appId={appId} titleText={titleVersion}>
          <AppRouter appId={appId}/>
        </MFEAppContainer>
      </CustomOIDCAuthProvider>
    </StrictMode>

  );
}

export default App;
