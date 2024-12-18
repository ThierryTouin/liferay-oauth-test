import React, { StrictMode } from 'react';
import { MFEAppContainer, CustomOIDCAuthProvider } from 'common-modules';
import AppRouter from './routes/AppRouter';

const App: React.FC = () => {

  const appId = "app1";
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
