import React, { useEffect } from 'react';
import { useAuth, AuthContextProps } from "react-oidc-context";
import { ErrorMessage } from 'common-components';
import {App2ContextParams } from '../models/App2ContextParams';

const PrivatePage: React.FC = () => {

  const oidc: AuthContextProps = useAuth();
  const user = oidc.user;

  const firstName: string | undefined = user?.profile?.given_name;
  const lastName: string | undefined = user?.profile?.family_name;
  const email: string | undefined = user?.profile?.email;
  const accessToken: string | undefined = user?.access_token;

  useEffect(() => {
    if (user) {
      const app2ContextParams: App2ContextParams = {
        firstName: firstName || "Unknown",
        lastName: lastName || "Unknown",
        email: email || "Unknown",
        accessToken: accessToken || ""
      };

      const event = new CustomEvent('app2-context-params', {
        detail: app2ContextParams
      });

      document.querySelector('app2-docker-example')?.dispatchEvent(event);
    }
  }, [firstName, lastName, email, accessToken, user]);

  if (!user) {
    return <ErrorMessage message="User needs to be signed in to use this feature" />;
  }

  return (
    <div>
      <h3>Private Page</h3>
      <nav>
        <a href="/">Go to Home</a>
      </nav>
      <br/>
      <h3>User information returned by SSO:</h3>
      <ul>
        <li><strong>First Name:</strong> {firstName}</li>
        <li><strong>Last Name:</strong> {lastName}</li>
        <li><strong>Email:</strong> {email}</li>
      </ul>
      <app2-docker-example/>
    </div>
  );
};

export default PrivatePage;