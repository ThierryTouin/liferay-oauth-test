import React from "react";
import { ErrorMessage } from './ErrorMessage';

export const ExternalLogin: React.FC = () => (
  <>
    <ErrorMessage message="Please sign in to access the application. You need to authenticate using OpenID Connect to use this application." />
  </>
);

export default ExternalLogin;
